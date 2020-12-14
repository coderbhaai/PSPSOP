<?php

namespace App\Http\Controllers;

use Auth;
use Hash;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function test(Request $request){
        // dd('I was hit');
        return response()->json([
            'status_code' => 'Working',
        ]);

        // $response       = [
        //     'status_code' => 'Working',
        // ];
        // return response()->json($response, 201);
    
    }

    public function register(Request $request){ 
        $payload = [
            'password'=>\Hash::make($request->password),
            'email'=>$request->email,
            'name'=>$request->name,
            'role'=>$request->role,
            'status'=>$request->status,
        ];
        $existing = User::where('email', '=', $request->email)->first();
        if (!is_null($existing)) {
            $response = ['success'=>false, 'message'=>'Email already registered'];   
            return response()->json($response, 201);          
        }

        if($request->password_confirmation === $request->password){
        }else{
            $response = ['success'=>false, 'message'=>'Passwords Do Not Match'];   
            return response()->json($response, 201);
        }

        $user = new \App\Models\User($payload);
        if ($user->save())
        {
            $user = \App\Models\User::where('email', $request->email)->first();
            $tokenResult = $user->createToken('authToken')->plainTextToken;
            $user->save();
            $response = [
                'success'       =>  true,
                'message'       =>  'Registration succesful',
                'access_token'  =>  $tokenResult,
                'token_type'    =>  'Bearer',
                'data'          =>  $user
            ];
            return response()->json($response, 201);
        }
    }

    public function login(Request $request){
        try {
                $request->validate([
                    'email'             => 'email|required',
                    'password'          => 'required'
                ]);
                if(!(User::where('email', $request->email)->exists())){
                    return response()->json([
                        'success'       =>  false, 
                        'message'       =>  "No account by this name. Please register"
                    ]);
                }
                $credentials = request(['email', 'password']);
                if (!Auth::attempt($credentials)) {
                    return response()->json([
                        'success'       => false,
                        'status_code'   => 500,
                        'message'       => 'You are not Authorised'
                    ]);
                }
                $user = User::where('email', $request->email)->first();
                if ( ! Hash::check($request->password, $user->password, [])) {
                    throw new \Exception('Error in Login');
                }
                $tokenResult = $user->createToken('authToken')->plainTextToken;
                return response()->json([
                    'success'           => true,
                    'status_code'       => 200,
                    'access_token'      => $tokenResult,
                    'token_type'        => 'Bearer',
                    'message'           => 'Welcome Aboard',
                    'data'              =>  $user
                ]);
            } 
        catch (Exception $error) {
            return response()->json([
                'status_code' => 500,
                'message' => 'Error in Login',
                'error' => $error,
            ]);
        }
    }
}