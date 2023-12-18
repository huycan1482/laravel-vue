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

Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('refresh-token', 'AuthController@refreshToken');

    // Route::post('register', 'AuthController@register');

    Route::group(['middleware' => 'auth.jwt'], function () {
        Route::post('logout', 'AuthController@logout');
        Route::post('user', 'AuthController@user');
    });

});

Route::group(['middleware' => 'auth.jwt'], function () {
    Route::get('test', 'AuthController@test');

    Route::prefix('users')->group(function () {
        Route::get('/getAll', 'UserController@getAll');
        Route::get('/show/{user}', 'UserController@show');
        Route::post('/', 'UserController@store');
        Route::put('/{user}', 'UserController@update');
        Route::delete('/{user}', 'UserController@destroy');
        Route::get('/search', 'UserController@search');
    });

    Route::prefix('category')->group(function () {
        Route::get('/getAll', 'CategoryController@getAll');
        Route::get('/{category}', 'CategoryController@show');
        Route::post('/', 'CategoryController@store');
        Route::put('/{category}', 'CategoryController@update');
        Route::delete('/{category}', 'CategoryController@destroy');
    });

    Route::prefix('chats')->group(function () {
        Route::post('/', 'ChatController@store');
        Route::get('/search', 'ChatController@search');
        Route::get('/chat-room/{chat}', 'ChatController@getChatRoom');
        Route::get('/add-user', 'ChatController@addUser');
    });
    
    Route::prefix('messages')->group(function () {
        Route::get('/get-chat-messages', 'MessageController@getChatMessages');
        Route::post('/send-message', 'MessageController@sendMessage');
    });
});

// Route::prefix('messages')->group(function () {
//     Route::get('/get-all', 'MessageController@getAll');
//     Route::get('/send-message', 'MessageController@sendMessage');
// });

