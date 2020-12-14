<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('/login', 'App\Http\Controllers\AuthController@login');
Route::post('/register', 'App\Http\Controllers\AuthController@register');

Route::get('/adminUsers', 'App\Http\Controllers\AdminController@adminUsers');
Route::post('/changeStatus', 'App\Http\Controllers\AdminController@changeStatus');

Route::get('/adminBasic', 'App\Http\Controllers\AdminController@adminBasic');
Route::post('/createBasic', 'App\Http\Controllers\AdminController@createBasic');
Route::post('/updateBasic', 'App\Http\Controllers\AdminController@updateBasic');

Route::get('/adminSop/{id}', 'App\Http\Controllers\AdminController@adminSop');
Route::post('/createSop', 'App\Http\Controllers\AdminController@createSop');
Route::post('/updateSop', 'App\Http\Controllers\AdminController@updateSop');
Route::get('/getSop/{id}', 'App\Http\Controllers\AdminController@getSop');
Route::get('/sopList', 'App\Http\Controllers\AdminController@sopList');