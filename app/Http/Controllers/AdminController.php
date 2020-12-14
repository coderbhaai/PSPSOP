<?php

namespace App\Http\Controllers;

use DB;
use File;
use App\Models\User;
use App\Models\Basic;
use App\Models\Sop;
use Illuminate\Http\Request;

class AdminController extends Controller
{

    private function getBasic($type, $id){
        if($type === 'dept'){
            $data   = Basic::where('id', $id)->select('id as deptId','type','tab1 as department','updated_at')->get();
        }else
        if($type === 'process'){
            $data   = Basic::where('id', $id)->select('id as processId','type','tab1 as deptId','tab2 as process','updated_at')->get()->map(function($i) {
                $dept      = Basic::where('id', $i->deptId)->select('id as deptId','type','tab1 as department')->first();
                $i['dept']          =   $dept;
                $i['department']    =   $dept->department;
                return $i;
            });
        }else
        if($type === 'subprocess'){
            $data   = Basic::where('id', $id)->select('id as subprocessId','type','tab1 as deptId','tab2 as processId','tab3 as subprocess','updated_at')->get()->map(function($i) {
                $dept      = Basic::where('id', $i->deptId)->select('id as deptId','type','tab1 as department')->first();
                $process      = Basic::where('id', $i->processId)->select('id as processId','type','tab2 as process')->first();
                $i['dept']          =   $dept;
                $i['department']    =   $dept->department;
                $i['process']       =   $process;
                $i['processName']   =   $process->process;
                return $i;
            });
        }else
        if($type === 'superprocess'){
            $data = Basic::where('id', $id)->select('id as superprocessId','type','tab1 as deptId','tab2 as processId','tab3 as subOrSuperId','tab4 as superprocess','updated_at')->get()->map(function($i) {
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
        }
        return $data[0];
    }

    public function adminUsers(){
        $user = User::select('id','name','role','email','updated_at', 'status')->get();
        return response()->json([
            'data' => $user
        ]); 
    }

    public function changeStatus(Request $request){
        $dB                   =   User::find($request->id);
        $dB->status           =   $request->status;
        $dB-> save();
        $data = User::where('id', $request->id)->select('id','name','role','email','updated_at', 'status')->first();
        $response = ['success'=>true, 'data' => $data, 'message'=>'Status Updated Succesfully'];
        return response()->json($response, 201);
    }

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

    public function createBasic(Request $request){
        $dB                      =   new Basic;
        $dB->userId              =   $request->userId;
        $dB->type                =   $request->type;
        $dB->tab1                =   $request->tab1;
        $dB->tab2                =   $request->tab2;
        $dB->tab3                =   $request->tab3;
        $dB->tab4                =   $request->tab4;
        $dB-> save();
        
        $data       =   $this->getBasic($request->type, $dB->id);
        $response = ['success'=>true, 'data'=>$data,'$dB->id'=>$dB->id, '$request->type'=>$request->type, 'message' => "Basic updated succesfully"];
        return response()->json($response, 201);
    }

    public function updateBasic(Request $request){
        $dB                      =   Basic::find($request->id);
        $dB->type                =   $request->type;
        $dB->tab1                =   $request->tab1;
        $dB->tab2                =   $request->tab2;
        $dB->tab3                =   $request->tab3;
        $dB->tab4                =   $request->tab4;
        $dB-> save();
        
        $data       =   $this->getBasic($request->type, $request->id);
        $response = ['success'=>true, 'data'=>$data, 'message' => "Basic updated succesfully"];
        return response()->json($response, 201);
    }

    public function adminSop($id){
        $sop = Sop::where('userId', $id )->select('id','userId','dept','process','subprocess','subsubprocess','sop','updated_at')->get();
        return response()->json([
            'data' => $sop
        ]); 
    }

    public function createSop(Request $request){
        $sopExists = Sop::where('sopfor', $request->sopfor)->first();
        if($sopExists === null){
            $dB                     =   new Sop;
            $dB->userId             =   $request->userId;
            $dB->sopfor             =   $request->sopfor;
            // $dB->sop                =   $request->sop;
            $dB->sop                =  'sop for '.$request->sopfor .' - '. time();
            $dB-> save();
            $data = Sop::limit(1)->orderBy('id', 'desc')->select('id','userId','sopfor','sop','updated_at')->first();
            $response = ['success'=>true, 'data'=>$data, 'message' => "SOP created succesfully"];
        }else{
            $response = ['success'=>false, 'message' => "SOP already exists"];
        }
        return response()->json($response, 201);
    }

    public function updateSop(Request $request){
        $dB                     =   Sop::find($request->id);
        $dB->dept               =   $request->dept;
        $dB->process            =   $request->process;
        $dB->subprocess         =   $request->subprocess;
        $dB->subsubprocess      =   $request->subsubprocess;
        $dB->sop                =   $request->sop;
        $dB-> save();
        $data = Sop::where('id', $request->id)->select('id','userId','dept','process','subprocess','subsubprocess','sop','updated_at')->first();
        $response = ['success'=>true, 'data'=>$data, 'message' => "SOP updated succesfully"];
        return response()->json($response, 201);
    }

    public function getSop($id){
        $sop = Sop::select('id','userId','dept','process','subprocess','subsubprocess','sop','updated_at')->where('id', $id)->first();
        return response()->json([
            'data' => $sop
        ]); 
    }

    public function sopList(){
        $sopList = [];
        $sop = Sop::select('id','userId','sopfor')->get();
        foreach ($sop as $i) {
            array_push($sopList, $i->sopfor);
        }
        return response()->json([
            'sopList'=>$sopList,
            'data' => $sop,
        ]); 
    }

    
}
