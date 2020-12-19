<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;

Route::post('/login', 'App\Http\Controllers\AuthController@login');
Route::post('/register', 'App\Http\Controllers\AuthController@register');
Route::post('/forgotPassword', 'App\Http\Controllers\AuthController@forgotPassword');
Route::post('/resetPassword', 'App\Http\Controllers\AuthController@resetPassword');
Route::post('/appForgotPassword', 'App\Http\Controllers\AuthController@appForgotPassword');

Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout/{id}', [AuthController::class, 'logout']);
    // Only for Admin
        Route::get('/adminUsers', [AdminController::class, 'adminUsers']);
        Route::post('/changeOrgStatus', [AdminController::class, 'changeOrgStatus']);
    // Only for Admin

    // Only for Org
        Route::get('/userUsers', [AdminController::class, 'userUsers']);
        Route::get('/userBasic', [AdminController::class, 'userBasic']);
    // Only for Org
        
    // Common for both
        Route::post('/createBasic', [AdminController::class, 'createBasic']);
        Route::post('/updateBasic', [AdminController::class, 'updateBasic']);
        Route::post('/changeBasicStatus', [AdminController::class, 'changeBasicStatus']);
        
        Route::get('/sopBasic', [AdminController::class, 'sopBasic']);
        Route::get('/fetchOrder/{id}', [AdminController::class, 'fetchOrder']);
        Route::post('/createSop', [AdminController::class, 'createSop']);
        Route::get('/sopList', [AdminController::class, 'sopList']);
        Route::get('/getSop/{id}', [AdminController::class, 'getSop']);
        Route::post('/updateSop', [AdminController::class, 'updateSop']);
    // Common for both

    // For App
        
    // For App
    });
    // Route::post('/changeUserStatus', 'App\Http\Controllers\AdminController@changeUserStatus');
    
Route::get('/adminSop/{id}', 'App\Http\Controllers\AdminController@adminSop');
Route::get('/deptList', 'App\Http\Controllers\AdminController@deptList');
Route::get('/getSopDetails/{type}/{id}', 'App\Http\Controllers\AdminController@getSopDetails');
Route::get('/fetchDepartment/{id}', 'App\Http\Controllers\AdminController@fetchDepartment');
Route::get('/fetchProcess/{id}', 'App\Http\Controllers\AdminController@fetchProcess');
Route::get('/fetchSubProcess/{id}', 'App\Http\Controllers\AdminController@fetchSubProcess');