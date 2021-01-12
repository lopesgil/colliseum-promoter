<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PromoterController;
use App\Http\Controllers\PassportController;
use App\Http\Middleware\Admin;
use App\Http\Middleware\Promoter;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//event routes
Route::get('events', [EventController::class, 'index']);
Route::get('event/{id}', [EventController::class, 'show']);
Route::put('event/{id}', [EventController::class, 'update']);
Route::post('search', [EventController::class, 'searchEvent']);

//user Routes
Route::post('user', [UserController::class, 'store']);
Route::get('users', [UserController::class, 'index']);
Route::get('user/{id}', [UserController::class, 'show']);
Route::put('user/{id}', [UserController::class, 'update']);
Route::delete('user/{id}', [UserController::class, 'destroy']);

//promoter routes
Route::get('promoters', [PromoterController::class, 'index']);
Route::get('promoter/{id}', [PromoterController::class, 'show']);
Route::put('promoter/{id}', [PromoterController::class, 'update']);
Route::delete('promoter/{id}', [PromoterController::class, 'destroy']);

//passport routes
Route::post('register', [PassportController::class, 'register']);
Route::post('login', [PassportController::class, 'login']);

Route::group(['middleware' => 'auth:api'], function() {
    
    Route::post('event', [EventController::class, 'store'])->middleware(Promoter::class);
    Route::get('getDetails', [PassportController::class, 'getDetails']);
    Route::get('logout', [PassportController::class, 'logout']);
    //admin routes
    Route::delete('event/{id}', [EventController::class, 'destroy'])->middleware(Admin::class);
    //password route
    Route::put('password', [userController::class, 'changePassword']);
});