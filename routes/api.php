<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;

Route::post('/login', 'App\Http\Controllers\AuthController@login');
Route::post('/register', 'App\Http\Controllers\AuthController@register');

Route::middleware('auth:sanctum')->group(function () {
    // Only for Admin
        Route::get('/adminUsers', 'App\Http\Controllers\AdminController@adminUsers');
        Route::post('/changeOrgStatus', 'App\Http\Controllers\AdminController@changeOrgStatus');
    // Only for Admin

    // Only for Org
        Route::get('/userUsers', 'App\Http\Controllers\AdminController@userUsers');
        Route::get('/userBasic', 'App\Http\Controllers\AdminController@userBasic');
    // Only for Org
        
    // Common for both
        Route::post('/createBasic', 'App\Http\Controllers\AdminController@createBasic');
        Route::post('/updateBasic', 'App\Http\Controllers\AdminController@updateBasic');
        Route::post('/changeBasicStatus', 'App\Http\Controllers\AdminController@changeBasicStatus');
        
        Route::get('/sopBasic', 'App\Http\Controllers\AdminController@sopBasic');
        Route::get('/fetchOrder/{id}', 'App\Http\Controllers\AdminController@fetchOrder');
        Route::post('/createSop', 'App\Http\Controllers\AdminController@createSop');
        Route::get('/sopList', 'App\Http\Controllers\AdminController@sopList');
        Route::get('/getSop/{id}', 'App\Http\Controllers\AdminController@getSop');
        Route::post('/updateSop', 'App\Http\Controllers\AdminController@updateSop');
        
        // Common for both
    });
    // Route::post('/changeUserStatus', 'App\Http\Controllers\AdminController@changeUserStatus');

    
    
    
Route::get('/adminSop/{id}', 'App\Http\Controllers\AdminController@adminSop');
Route::get('/deptList', 'App\Http\Controllers\AdminController@deptList');
Route::get('/getSopDetails/{type}/{id}', 'App\Http\Controllers\AdminController@getSopDetails');
Route::get('/fetchDepartment/{id}', 'App\Http\Controllers\AdminController@fetchDepartment');
Route::get('/fetchProcess/{id}', 'App\Http\Controllers\AdminController@fetchProcess');
Route::get('/fetchSubProcess/{id}', 'App\Http\Controllers\AdminController@fetchSubProcess');