<?php

namespace App\Http\Controllers;

use Auth;
use Hash;
use Mail;
use App\Models\User;
use App\Mail\ForgotPassword;
use App\Mail\ChangedPassword;
use App\Mail\PasswordChanged;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    private function randomPassword() {
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < 8; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass); //turn the array into a string
    }

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
            'org'=>$request->org,
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>\Hash::make($request->password),
            'role'=>$request->role,
            'status'=>$request->status,
        ];
        $existing = User::where('org', '=', $request->org)->first();
        if (!is_null($existing)) {
            $response = ['success'=>false, 'message'=>'Organisation already registered'];
            return response()->json($response, 201);
        }

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
            // $tokenResult = $user->createToken('authToken')->plainTextToken;
            $user->save();
            $response = [
                'success'       =>  true,
                'message'       =>  'Registration succesful',
                // 'access_token'  =>  $tokenResult,
                // 'token_type'    =>  'Bearer',
                // 'data'          =>  $user
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
                if(!(User::where('email', $request->email)->where('status', 1)->exists())){
                    return response()->json([
                        'success'       =>  false,
                        'message'       =>  "You have not been approved yet."
                    ]);
                }
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
                // $tokenResult = $user->createToken('authToken')->plainTextToken;
                if($user->role === 'Admin'){ $tokenResult = $user->createToken('authToken', ['Admin'])->plainTextToken; }
                if($user->role === 'Org'){ $tokenResult = $user->createToken('authToken', ['Org'])->plainTextToken; }
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

    public function forgotPassword(Request $request){
        $user = User::where('email', $request->email)->get()->first();
        if(is_null($user)){
            $response = ['success'=>false, 'message'=>"No account by this name. Please register"];
        }else{
            $token = substr(sha1(rand()), 0, 30);
            $date = now();
            DB::table('password_resets')
                ->updateOrInsert(
                    ['email' => $request->email],
                    ['token' => $token, 'created_at' => $date]
                );

            $user_email = $request->email;
            Mail::to( $user_email)->send(new ForgotPassword($token, $user)); 
            $response = ['success'=>true, 'message' => "Password Reset Email Sent. Please Check"];
        }
        return response()->json($response, 201);
    }

    public function resetPassword(Request $request){
        $user =     User::where('email', $request->email)->first();
        $valid =    DB::table('password_resets')
                        ->where('email', $request->email)
                        ->where('token', $request->token)
                        ->first();
        if(is_null($user)){
            $response = ['success'=>false, 'message'=>"No account by this name. Please register"];
        }elseif($request->confirm_password !== $request->password){
            $response = ['success'=>false, 'message'=>'Password Mismatch'];   
            return response()->json($response, 201);
        }elseif(is_null($valid)){
            $response = ['success'=>false, 'message'=>'You did not ask for Password Reset'];
        }else{
                $token = substr(sha1(rand()), 0, 30);
                $user->password =    \Hash::make($request->password);
                $user->remember_token = $token;
                $user->save();
                DB::delete('delete from password_resets where token = ?',[$request->token]);
                $response = ['success'=>true, 'message' => "Password has been Reset. Please Login", 'valid'=>$valid];
            }
        
        return response()->json($response, 201);
    }

    public function appForgotPassword(Request $request){
        $user = User::where('email', $request->email)->select('name')->first();
        if(is_null($user)){
            $response = ['success'=>false, 'message'=>"No account by this name. Please register"];
        }else{
            $password =   $this->randomPassword();
            $date = now();
            $user->password = \Hash::make($password);
            $user->updated_at = $date;
            $user->save();
            $user_email = $request->email;
            Mail::to( $user_email)->send(new ChangedPassword($password, $user)); 
            $response = ['success'=>true, 'message' => "Password changed. Please Check Email"];
        }
        return response()->json($response, 201);
    }

    public function appResetPassword(Request $request){
        $user = User::find(Auth::user()->id);
        if(is_null($user)){
            $response = ['success'=>false, 'message'=>"No account by this name. Please register"];
        }else if($user->email !== $request->email){
            $response = ['success'=>false, 'message'=>"This is not your account"];
        }else{
            $date = now();
            $user->password = \Hash::make($request->password);
            $user->updated_at = $date;
            $user->save();
            $user_email = $request->email;
            Mail::to( $user_email)->send(new PasswordChanged($user));
            $response = ['success'=>true, 'message' => "Password changed."];
        }
        return response()->json($response, 201);
    }
     
    public function logout($id){
        $user = User::find($id);
        $user->tokens()->where('tokenable_id', $id)->delete();
        return response()->json([
            'success'           => true,
            'data'              =>  $user,
            'message'           => 'You have been logged out'
        ]);
    }
}