<?php

namespace App\Http\Controllers;

use DB;
use File;
use Auth;
use App\Models\Org;
use App\Models\User;
use App\Models\Basic;
use App\Models\Sop;
use App\Models\SopList;
use App\Models\Subscribe;
use App\Models\Special;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    private function checkAdmin(){ if (Auth::user()->tokenCan('Admin') ) { return true; }else{ return false; } }
    private function checkOrg(){ if (Auth::user()->tokenCan('Org') ) { return true; }else{ return false; } }
    private function checkAdminOrOrg(){ if (Auth::user()->tokenCan('Admin') || Auth::user()->tokenCan('Org') ) { return true; }else{ return false; } }

    private function getBasic($id){
        $data       = Basic::where('id', $id)->select('id', 'step','head','dept', 'name','status', 'updated_at')->get()->map(function($i) {
            if($i->step===0){ $order = [$i->name]; }else{ $order = $this->getOrder($i->id); }
            $i['order']          =   $order;
            return $i;
        });
        return $data[0];
    }

    public function adminSop($id){
        $sop = Sop::where('userId', $id )->select('id','userId','sopfor','updated_at')->get()->map(function($i) {
            $data                   =   $this->getBasic($i->sopfor);
            if($data->type==='process'){ $process = $this->getBasic($i->sopfor); }else{ $process = null; }
            if($data->type==='subprocess'){ $subprocess = $this->getBasic($i->sopfor); }else{ $subprocess = null; }
            if($data->type==='superprocess'){ $superprocess = $this->getBasic($i->sopfor); }else{ $superprocess = null; }

            $i['basic']             =   $data;
            $i['process']           =   $process;
            $i['subprocess']        =   $subprocess;
            $i['superprocess']      =   $superprocess;
            return $i;
        });
        return response()->json([
            'data' => $sop
        ]); 
    }

    public function addSubscribe(Request $request){
        $existing = Subscribe::where('email', $request->email )->first();
        if (!is_null($existing)) {
            $response = ['success'=>false, 'message'=>'Email already Subscribed'];
        }else{
            $dB                      =   new Subscribe;
            $dB->email               =   $request->email;
            $dB->status              =   $request->status;
            $dB-> save();
            $response = ['success'=>true, 'message' => "Subscription succesfull"];
        }
        return response()->json($response, 201);
    }

// Admin Functions
    public function adminOrg(){
        if($this->checkAdmin()){
            $org = org::select('id','name','email','status','updated_at')->get();
            return response()->json([
                'data' => $org
            ]);
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
    }

    public function createOrg(Request $request){
        if($this->checkAdmin()){
            $dB                     =   new Org;
            $dB->name               =   $request->name;
            $dB->email              =   $request->email;
            $dB->status             =   $request->status;
            $dB-> save();
            $data = Org::limit(1)->orderBy('id', 'desc')->select('id','name','email','status','updated_at')->first();
            return response()->json([
                'success'=>true,
                'message'=>'Org Added Succesfully',
                'data' => $data
            ]);
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
    }

    public function updateOrg(Request $request){
        if($this->checkAdmin()){
            $dB                      =   Org::find($request->id);
            $dB->name                =   $request->name;
            $dB->email               =   $request->email;
            $dB->status              =   $request->status;
            $dB-> save();
            $data = Org::where('id', $request->id)->select('id','name','email','status','updated_at')->first();
            $response = ['success'=>true, 'data'=>$data, 'message' => "Org updated succesfully"];
            return response()->json($response, 201);
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
    }

    public function adminUsers(){
        if($this->checkAdmin()){
            $data        =   DB::table('users')->leftJoin('orgs', 'orgs.id', '=', 'users.org')
                                ->select([ 'users.id', 'users.name','users.email', 'users.role', 'users.org','users.status as userStatus','users.updated_at', 'orgs.name as orgName', 'orgs.email as orgEmail', 'orgs.status as orgStatus' ])
                                ->get();
            return response()->json([
                'data' => $data
            ]);
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
    }

    public function changeUserStatusByAdmin(Request $request){
        if($this->checkAdmin()){
            $dB                   =   User::find($request->id);
            $dB->status           =   $request->status;
            $dB-> save();
            $data        =   DB::table('users')->leftJoin('orgs', 'orgs.id', '=', 'users.org')
                                ->where('users.id', $request->id)
                                ->select([ 'users.id', 'users.name','users.email', 'users.role', 'users.org','users.status as userStatus','users.updated_at', 'orgs.name as orgName', 'orgs.email as orgEmail', 'orgs.status as orgStatus' ])
                                ->first();
            $response = ['success'=>true, 'data' => $data, 'message'=>'Status Updated Succesfully'];
            return response()->json($response, 201);
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
    }

    public function changeOrgStatus(Request $request){
        if($this->checkAdmin()){
            $dB                   =   Org::find($request->id);
            $dB->status           =   $request->status;
            $dB-> save();
            $data = Org::where('id', $request->id)->select('id','name','email','status','updated_at')->first();
            $response = ['success'=>true, 'data' => $data, 'message'=>'Status Updated Succesfully'];
            return response()->json($response, 201);
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
    }

    public function makeOrgAdmin(Request $request){
        if($this->checkAdmin()){
            $dB                     =   User::find($request->id);
            $dB->role               =   $request->role;
            $dB-> save();            
            $data        =   DB::table('users')
                                ->where('users.id', $request->id)
                                ->leftJoin('orgs', 'orgs.id', '=', 'users.org')
                                ->select([ 'users.id', 'users.name','users.email', 'users.role', 'users.org','users.status as userStatus','users.updated_at', 'orgs.name as orgName', 'orgs.email as orgEmail', 'orgs.status as orgStatus' ])
                                ->first();
            $response = ['success'=>true, 'data' => $data, 'message'=>'Status Updated Succesfully'];
            return response()->json($response, 201);
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
    }
// Admin Functions

// Org Functions
    public function userUsers(){
        if($this->checkOrg()){
            $data = User::where('org', Auth::user()->org)->select('id','org','name','role','email','updated_at', 'status')->get();
            $response = ['success'=>true, 'data' => $data ];
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }

        return response()->json($response, 201);
    }

    public function updateRole(Request $request){
        if($this->checkAdminOrOrg()){
            $existing = User::where('org', Auth::user()->org)->where('id', $request->id)->first();
            if ($existing) {
                $dB                     =   User::find($request->id);
                $dB->role               =   $request->role;
                $dB-> save();
                $data = User::where('id', $request->id)->select('id','org','name','role','email','updated_at', 'status')->first();
                $response = ['success'=>true, 'data' => $data, 'message'=>'Role Updated Succesfully'];
            }else{
                $response = ['success'=>false, 'message'=>'You are not authorised'];
            }
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }

        return response()->json($response, 201);
    }

    public function changeUserStatus(Request $request){
        if($this->checkAdminOrOrg()){
            $dB                   =   User::find($request->id);
            $dB->status           =   $request->status;
            $dB-> save();
            $data = User::where('id', $request->id)->select('id','org','name','role','email','updated_at', 'status')->first();
            $response = ['success'=>true, 'data' => $data, 'message'=>'Status Updated Succesfully'];
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }

        return response()->json($response, 201);
    }

    public function userBasic(){
        if($this->checkAdminOrOrg()){
            // $data       = Basic::where('orgId', Auth::user()->org)->select('id', 'step', 'head', 'dept', 'name', 'status', 'updated_at')->get()->map(function($i) {
            //     if($i->step===0){ $order = [$i->name]; }else{ $order = $this->getOrder($i->id); }
            //     $i['order']          =   $order;
            //     return $i;
            // });

            $data =         DB::table('basics')
                            ->leftJoin('sop_lists', 'sop_lists.sopfor', '=', 'basics.id')
                            ->where('basics.orgId', Auth::user()->org)
                            ->select([ 'basics.id', 'basics.step', 'basics.dept', 'basics.head', 'basics.name', 'basics.status', 'basics.updated_at', 'sop_lists.sopfor', 'sop_lists.sop' ])
                            ->get();
            $response = [ 'success'=>true, 'data' => $data ];
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }

        return response()->json($response, 201);
    }

    public function orgAbout(){
        if($this->checkOrg()){
            $data = Special::where('orgId', Auth::user()->org)->select('id', 'about', 'updated_at')->get();
            $response = [ 'success'=>true, 'data' => $data ];
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
        
        return response()->json($response, 201);
    }

    public function createAbout(Request $request){
        if($this->checkOrg()){
            $existing = Special::where('orgId', Auth::user()->org)->first();
            if (!is_null($existing)) {
                $response = ['success'=>false, 'message'=>'About already added'];
            }else{
                $dB                      =   new Special;
                $dB->orgId               =   Auth::user()->org;
                $dB->about               =   $request->about;
                $dB-> save();
            }
            $data = Special::where('orgId', Auth::user()->org)->limit(1)->orderBy('id', 'desc')->select('id', 'about', 'updated_at')->first();
            $response = [ 'success'=>true, 'data' => $data, 'message' => 'About added succesfully' ];
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }

        return response()->json($response, 201);
    }

    public function updateAbout(Request $request){
        if($this->checkOrg()){
            $dB                      =   Special::find($request->id);
            $dB->about               =   $request->about;
            $dB-> save();
            $data = Special::where('orgId', Auth::user()->org)->limit(1)->orderBy('id', 'desc')->select('id', 'about', 'updated_at')->first();
            $response = [ 'success'=>true, 'data' => $data, 'message' => 'About updated succesfully' ];
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }

        return response()->json($response, 201);
    }

    public function orgLogo(){
        if($this->checkOrg()){
            $data = Org::where('id', Auth::user()->org)->select('id', 'logo', 'updated_at')->first();
            $response = [ 'success'=>true, 'data' => $data ];
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
        
        return response()->json($response, 201);
    }

    public function updateLogo(Request $request){
        if($this->checkOrg()){
            $dB                     =   Org::where('id', Auth::user()->org )->first();
            if ($request->file !== 'null') {
                //dd($request->file->getClientOriginalExtension());
                $fileName = time() . '.' . request()->file->getClientOriginalExtension();
                request()->file->move(storage_path('app/public/logo/'), $fileName);
                if(!is_null( $request->oldLogo)){
                    $deleteImage = public_path("storage/logo/{$request->oldLogo}");        
                    if (isset($deleteImage)) { file::delete($deleteImage); }
                }
                $dB->logo = $fileName;
            }else{
                dd('222');
            }
            $dB-> save();
            $data = Org::where('id', Auth::user()->org)->select('id', 'logo', 'updated_at')->first();
            $response = ['success'=>true, 'data'=>$data, 'message' => "Logo updated succesfully"];
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }

        return response()->json($response, 201);
    }




// Org Functions

// Common for Admin and Org
    private function getOrder($id){
        $xx         = Basic::where('id', $id)->select('name', 'step', 'head')->first();
        $step       = $xx->step;
        $headId     = $xx->head;
        $data       = [$xx->name];
        while($step>=0) {
            $yy             = Basic::where('id', $headId)->select('name','step', 'head')->first();
            if($yy){
                array_push( $data, $yy->name );
                $headId         = $yy->head;
            }
            $step--;
        }
        return array_reverse( $data );
    }

    public function createBasic(Request $request){
        if($this->checkAdminOrOrg()){
            $dB                      =   new Basic;
            $dB->orgId               =   Auth::user()->org;
            $dB->step                =   $request->step;
            $dB->dept                =   $request->dept;
            $dB->head                =   $request->head;
            $dB->name                =   $request->name;
            $dB->status              =   $request->status;
            $dB-> save();
            $data       =   $this->getBasic($dB->id);
            $response = ['success'=>true, 'data'=>$data, 'message' => "Basic created succesfully"];
            return response()->json($response, 201);
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
    }

    public function updateBasic(Request $request){
        if($this->checkAdminOrOrg()){
            $dB                      =   Basic::find($request->id);
            $dB->name                =   $request->name;
            $dB-> save();
            $data       =   $this->getBasic($request->id);
            $response = ['success'=>true, 'data'=>$data, 'message' => "Basic updated succesfully"];
            return response()->json($response, 201);
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
    }

    public function changeBasicStatus(Request $request){
        if($this->checkAdminOrOrg()){
            $dB                   =   Basic::find($request->id);
            $dB->status           =   $request->status;
            $dB-> save();

            $data       =   $this->getBasic($request->id);
            $response = ['success'=>true, 'data' => $data, 'message'=>'Status Updated Succesfully'];
            return response()->json($response, 201);
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
    }

    public function sopBasic(){
        if($this->checkAdminOrOrg()){
            $orgId = Auth::user()->org;
            $data = DB::select( DB::raw("SELECT id as value, name as text from basics where orgId='$orgId' AND id not in(select sopfor from sops)") );
            return response()->json([
                'success'=>true,
                'data' => $data
            ]);
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
    }

    public function fetchOrder($id){
        if($this->checkAdminOrOrg()){
            $data = $this->getOrder($id);
            return response()->json([
                'success'=>true,
                'data' => $data
            ]);
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
    }

    public function createSop(Request $request){
        if($this->checkAdminOrOrg()){
            $sopExists = Sop::where('sopfor', $request->sopfor)->first();
            if($sopExists === null){
                $dB                     =   new Sop;
                $dB->orgId              =   Auth::user()->org;
                $dB->sopfor             =   $request->sopfor;
                $dB->sop                =   $request->sop;
                $dB-> save();
                $response = ['success'=>true, 'message' => "SOP created succesfully"];
            }else{
                $response = ['success'=>false, 'message' => "SOP already exists"];
            }
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
        return response()->json($response, 201);
    }

    public function updateSop(Request $request){
        if($this->checkAdminOrOrg()){
            $dB                     =   Sop::where('sopfor', $request->sopfor)->first();
            $dB->sop                =   $request->sop;
            $dB-> save();
            $response = ['success'=>true, 'message' => "SOP updated succesfully"];
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }

        return response()->json($response, 201);
    }

    public function sopList(){
        if($this->checkAdminOrOrg()){
            $data       = Sop::where('orgId', Auth::user()->org)->select('id', 'sopfor','sop', 'updated_at')->get()->map(function($i) {
                $order = $this->getOrder($i->sopfor);
                $i['order']          =   $order;
                $i['sopForName']     =   $order[0];
                return $i;
            });
            $response = [ 'success'=>true, 'data'=>$data,]; 
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
        return response()->json($response, 201);
    }

    public function getSop($id){
        if($this->checkAdminOrOrg()){
            $data = Sop::select('id','orgId','sopfor','sop','updated_at')->where('sopfor', $id)->get()->map(function($i) {
                $order = $this->getOrder($i->sopfor);
                $i['order']          =   $order;
                $i['sopForName']     =   $order[0];
                return $i;
            });
            $response = [ 'success'=>true, 'data'=>$data[0],]; 
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
        return response()->json($response, 201);
    }

    public function uploadSop(Request $request){
        if($this->checkAdminOrOrg()){
            $dB                     =   new SopList;
            $dB->orgId              =   Auth::user()->org;
            $dB->sopfor             =   $request->sopfor;
            if ($request->file !== 'null') {
                $fileName = time() . '.' . request()->file->getClientOriginalExtension();
                request()->file->move(storage_path('app/public/sop/'), $fileName);
                $dB->sop = $fileName;
            }
            $dB-> save();
            
            $data =         DB::table('basics')
                                ->leftJoin('sop_lists', 'sop_lists.sopfor', '=', 'basics.id')
                                ->where( 'sop_lists.id', $dB->id )
                                ->select([ 'basics.id', 'basics.step', 'basics.dept', 'basics.head', 'basics.name', 'basics.status', 'basics.updated_at', 'sop_lists.sopfor', 'sop_lists.sop' ])
                                ->first();

            $response = ['success'=>true, 'data'=>$data, 'message' => "SOP created succesfully"];
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
        return response()->json($response, 201);
    }

    public function updateSopFile(Request $request){
        if($this->checkAdminOrOrg()){
            $dB                     =   SopList::where('sopfor', $request->sopfor)->first();
            if ($request->file !== 'null') {
                $fileName = time() . '.' . request()->file->getClientOriginalExtension();
                request()->file->move(storage_path('app/public/sop/'), $fileName);
                if(!is_null( $dB->sop)){
                    $deleteImage = public_path("storage/sop/{$dB->sop}");        
                    if (isset($deleteImage)) { file::delete($deleteImage); }
                }
                $dB->sop = $fileName;
                $dB-> save();
                $data =         DB::table('basics')
                                ->leftJoin('sop_lists', 'sop_lists.sopfor', '=', 'basics.id')
                                ->where( 'sop_lists.sopfor', $request->sopfor )
                                ->select([ 'basics.id', 'basics.step', 'basics.dept', 'basics.head', 'basics.name', 'basics.status', 'basics.updated_at', 'sop_lists.sopfor', 'sop_lists.sop' ])
                                ->first();
            $response = ['success'=>true, 'data'=>$data, 'message' => "SOP updated succesfully"];
            }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
            return response()->json($response, 201);
        }
    }

// Common for Admin and Org

// For APP
    public function orgList(){
        $data   = Org::where('status', 1)->select('id','name as org')->get();
        return response()->json([ 'data' => $data ]); 
    }

    public function deptList(){
        $data   = Basic::where('orgId', Auth::user()->org)->where('head', 0 )->where('status', 1)->select('name', 'id')->get();
        return response()->json([ 
            'data' => $data
            ]);
    }

    public function sop($id){
        $data =         DB::table('basics')->where('orgId', Auth::user()->org)->where('id', $id)->select('name', 'id')->get()->map(function($i) {
            $i->id             =   (int)$i->id;
            $child = Basic::where('orgId', Auth::user()->org)->where('head', $i->id)->where('status', 1)->select('name', 'id')->get();
            $xx = Sop::where('orgId', Auth::user()->org)->where('sopfor', $i->id)->select('sop', 'updated_at')->first();
            $i->sop          =   $xx;
            $i->child        =   $child;
            return $i;
        });
        return $data;
    }

// For APP    
}