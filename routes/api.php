<?php

use App\Http\Controllers\Api\AccessController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\UserController;
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

Route::post('/user', [UserController::class, 'create']);
Route::post('/access', [AccessController::class, 'create']);

Route::apiResource('/clients', ClientController::class)->middleware('auth:sanctum');