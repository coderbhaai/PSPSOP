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
Route::get('/orgList', 'App\Http\Controllers\AdminController@orgList');

Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
    // Only for Admin
        Route::get('/adminUsers', [AdminController::class, 'adminUsers']);
        Route::get('/adminOrg', [AdminController::class, 'adminOrg']);
        Route::post('/createOrg', [AdminController::class, 'createOrg']);
        Route::post('/updateOrg', [AdminController::class, 'updateOrg']);
        Route::post('/changeOrgStatus', [AdminController::class, 'changeOrgStatus']);
        Route::post('/makeOrgAdmin', [AdminController::class, 'makeOrgAdmin']);
        Route::post('/changeUserStatusByAdmin', [AdminController::class, 'changeUserStatusByAdmin']);
    // Only for Admin
        
    // Only for Org
        Route::get('/userUsers', [AdminController::class, 'userUsers']);
        Route::post('/changeUserStatus', [AdminController::class, 'changeUserStatus']);
        // Only for Org
        
        // Common for both
        Route::get('/userBasic', [AdminController::class, 'userBasic']);
        Route::post('/createBasic', [AdminController::class, 'createBasic']);
        Route::post('/updateBasic', [AdminController::class, 'updateBasic']);
        Route::post('/changeBasicStatus', [AdminController::class, 'changeBasicStatus']);
        Route::post('/uploadSop', [AdminController::class, 'uploadSop']);
        Route::post('/updateSopFile', [AdminController::class, 'updateSopFile']);
        
        Route::get('/sopBasic', [AdminController::class, 'sopBasic']);
        Route::get('/fetchOrder/{id}', [AdminController::class, 'fetchOrder']);
        Route::post('/createSop', [AdminController::class, 'createSop']);
        Route::get('/sopList', [AdminController::class, 'sopList']);
        Route::get('/getSop/{id}', [AdminController::class, 'getSop']);
        Route::post('/updateSop', [AdminController::class, 'updateSop']);
    // Common for both

    // For App
        Route::get('/deptList', [AdminController::class, 'deptList' ]);
        Route::get('/sop/{id}', [AdminController::class, 'sop' ]);
    // For App
});