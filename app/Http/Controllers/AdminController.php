<?php

namespace App\Http\Controllers;

use DB;
use File;
use Auth;
use App\Models\User;
use App\Models\Basic;
use App\Models\Sop;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    private function checkAdmin(){ if (Auth::user()->tokenCan('Admin') ) { return true; }else{ return false; } }
    private function checkOrg(){ if (Auth::user()->tokenCan('Org') ) { return true; }else{ return false; } }
    private function checkAdminOrOrg(){ if (Auth::user()->tokenCan('Admin') || Auth::user()->tokenCan('Org') ) { return true; }else{ return false; } }

    private function getBasic($id){
        $data       = Basic::where('id', $id)->select('id', 'step','head', 'name','status', 'updated_at')->get()->map(function($i) {
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

// Admin Functions
    public function adminUsers(){
        if($this->checkAdmin()){
            $user = User::select('id','org','name','role','email','updated_at', 'status')->get();
            return response()->json([
                'data' => $user
            ]);
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
    }

    public function changeOrgStatus(Request $request){
        if($this->checkAdmin()){
            $dB                   =   User::find($request->id);
            $dB->status           =   $request->status;
            $dB-> save();
            $data = User::where('id', $request->id)->select('id','org','name','role','email','updated_at', 'status')->first();
            $response = ['success'=>true, 'data' => $data, 'message'=>'Status Updated Succesfully'];
            return response()->json($response, 201);
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
    }
// Admin Functions

// Org Functions
    public function userUsers(){
        if($this->checkOrg()){
            $data = User::where('org', Auth::user()->id)->select('id','org','name','role','email','updated_at', 'status')->get();
            return response()->json([
                'success'=>true,
                'data' => $data
            ]);
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
    }

    public function userBasic(){
        $data       = Basic::where('orgId', Auth::user()->id)->select('id', 'step','head', 'name','status', 'updated_at')->get()->map(function($i) {
            if($i->step===0){ $order = [$i->name]; }else{ $order = $this->getOrder($i->id); }
            $i['order']          =   $order;
            return $i;
        });
        return response()->json([
            'success'=>true,
            'data' => $data
        ]);
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
            $dB->orgId               =   Auth::user()->id;
            $dB->step                =   $request->step;
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
            $response = ['success'=>true, 'data' => $data[0], 'message'=>'Status Updated Succesfully'];
            return response()->json($response, 201);
        }else{ $response = [ 'success'=>false,  'message'=>'You are not Authorised']; }
    }

    public function sopBasic(){
        if($this->checkAdminOrOrg()){
            $data = DB::select( DB::raw("select id as value, name as text from basics where id not in(select sopfor from sops)") );
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
                $dB->orgId              =   Auth::user()->id;
                $dB->sopfor             =   $request->sopfor;
                $dB->sop                =   $request->sop;
                // $dB->sop                =  'sop for '.$request->sopfor .' - '. time();
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
            $data       = Sop::where('orgId', Auth::user()->id)->select('id', 'sopfor','sop', 'updated_at')->get()->map(function($i) {
                $order = $this->getOrder($i->id);
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

// Common for Admin and Org








    public function adminBasic(){
        $dept       = Basic::where('type','dept')->select('id as deptId','type','tab1 as department','updated_at')->get();
        $process    = Basic::where('type','process')->select('id as processId','type','tab1 as deptId','tab2 as process','updated_at')->get()->map(function($i) {
            $dept      = Basic::where('id', $i->deptId)->select('id as deptId','type','tab1 as department')->first();
            $i['dept']          =   $dept;
            $i['department']    =   $dept->department;
            return $i;
        });
        $subprocess    = Basic::where('type','subprocess')->select('id as subprocessId','type','tab1 as deptId','tab2 as processId','tab3 as subprocess','updated_at')->get()->map(function($i) {
            $dept      = Basic::where('id', $i->deptId)->select('id as deptId','type','tab1 as department')->first();
            $process      = Basic::where('id', $i->processId)->select('id as processId','type','tab2 as process')->first();
            $i['dept']          =   $dept;
            $i['department']    =   $dept->department;
            $i['process']       =   $process;
            $i['processName']   =   $process->process;
            return $i;
        });
        $superprocess = Basic::where('type', 'superprocess')->select('id as superprocessId','type','tab1 as deptId','tab2 as processId','tab3 as subOrSuperId','tab4 as superprocess','updated_at')->get()->map(function($i) {
            $dept           = Basic::where('id', $i->deptId)->select('id as deptId','type','tab1 as department')->first();
            $process        = Basic::where('id', $i->processId)->select('id as processId','type','tab2 as process')->first();
            $subOrSuper     = Basic::where('id', $i->subOrSuperId)->select('id as yy','type','tab2 as process')->get()->map(function($j) {
                $q          = Basic::where('id', $j->yy)->select('id as xx','type','tab3 as subOrSuper', 'tab4 as superprocess')->first();
                $j['finalSuper']       =   $q;
                return $j;
            });
            $i['dept']          =   $dept;
            $i['department']    =   $dept->department;
            $i['process']       =   $process;
            $i['processName']   =   $process->process;
            $i['subOrSuper']    =   $subOrSuper[0];
            return $i;
        });
        return response()->json([
            'dept'              =>  $dept,
            'process'           =>  $process,
            'subprocess'        =>  $subprocess,
            'superprocess'      =>  $superprocess
        ]); 
    }

        

    

    

    

    // public function sopList(){
    //     $sopList = [];
    //     $sop = Sop::select('id','userId','sopfor')->get();
    //     foreach ($sop as $i) { array_push($sopList, $i->sopfor); }
    //     return response()->json([
    //         'sopList'=>$sopList,
    //         'data' => $sop,
    //     ]); 
    // }

    public function deptList(){
        $data   = Basic::where('type', 'dept')->select('id as deptId','type','tab1 as department','updated_at')->get();
        return response()->json([
            'data' => $data
        ]); 
    }

    private function fetchSop($id){
        $data = Sop::where('sopfor', $id )->select('sop as sopData','updated_at as sopUpdatedAt')->first();
        return $data;
    }

    public function getSopDetails($type, $id){
        if($type === 'dept'){
            $basic  =   Basic::where('id', $id)->select('id as deptId','type','tab1 as department', 'updated_at as basicTime')->get()->map(function($i) {
                $sop                   =   $this->fetchSop($i->deptId);
                $i['sop']              =   $sop;
                return $i;
            });
            $data   =   Basic::where('tab1', $id)->where('type', 'process')->select('id as processId','type','tab2 as process')->get();
        }

        return response()->json([
            'data'          =>  $data,
            'basic'         =>  $basic[0],
        ]); 
    }

    public function fetchDepartment($id){
        $data  =   Basic::where('id', $id)->select('id as deptId','type','tab1 as department', 'updated_at as basicTime')->get()->map(function($i) {
            $sop                   =   $this->fetchSop($i->deptId);
            $process               =   Basic::where('tab1', $i->deptId)->where('type', 'process')->select('id as processId','type','tab2 as process')->get();
            $i['sop']              =   $sop;
            $i['process']          =   $process;
            return $i;
        });
        return response()->json([ 
            'data' =>  $data[0] 
        ]); 
    }

    public function fetchProcess($id){
        $data  =   Basic::where('id', $id)->select('id as processId','type','tab1', 'tab2 as process', 'updated_at as basicTime')->get()->map(function($i) {
            $dept  =   Basic::where('id', $i->tab1)->select('id as deptId','type','tab1 as dept')->first();
            $sop                   =   $this->fetchSop($i->processId);
            $subprocess            =   Basic::where('tab2', $i->processId)->where('type', 'subprocess')->select('id as subprocessId','type','tab3 as subprocess')->get();
            $i['sop']              =   $sop;
            $i['subprocess']       =   $subprocess;
            return $i;
        });
        return response()->json([ 
            'data' =>  $data[0] 
        ]); 
    }

    public function fetchSubProcess($id){
        $data  =   Basic::where('id', $id)->select('id as subprocessId','type','tab1', 'tab3 as subprocess', 'updated_at as basicTime')->get()->map(function($i) {
            $dept       =   Basic::where('id', $i->tab1)->select('id as deptId','type','tab1 as dept')->first();
            $process    =   Basic::where('id', $i->subprocessId)->select('id as processId','type','tab2 as process')->first();
            $sop                     =   $this->fetchSop($i->subprocessId);
            // if(count($sop)){ 
            //     $finalsop = $sop[0];
            // }else{
            //     $finalsop = null;
            // }
            $superprocess            =   Basic::where('tab3', $i->subprocessId)->where('type', 'superprocess')->select('id as superprocessId','type','tab4 as superprocess')->get();
            $i['dept']               =   $dept;
            $i['process']            =   $process;
            $i['sop']                =   $sop;
            $i['superprocess']       =   $superprocess;
            return $i;
        });
        return response()->json([ 
            'data' =>  $data[0]
        ]); 
    }


    
}