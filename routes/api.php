<?php

use Illuminate\Http\Request;

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

Route::prefix('admin')->group(function () {
    Route::get('{id}', 'AdminController@edit');
    Route::post('{id}', 'AdminController@update');
});

Route::prefix('comment')->group(function () {
    Route::get('all', 'CommentController@all');
    Route::put('create', 'CommentController@store');
    Route::post('{id}', 'CommentController@update');
    Route::delete('{id}', 'CommentController@destroy');
});

Route::prefix('banquet-facility')->group(function () {
    Route::get('all', 'BanquetFacilityController@all');
    Route::post('create', 'BanquetFacilityController@store');
    Route::delete('{id}', 'BanquetFacilityController@destroy');
});


Route::prefix('menu')->group(function () {
    Route::get('all', 'MenuController@all');
    Route::post('create', 'MenuController@store');
    Route::delete('{id}', 'MenuController@destroy');
});
Route::prefix('gallery')->group(function () {
    Route::get('all', 'GalleryController@all');
    Route::post('create', 'GalleryController@store');
    Route::delete('{id}', 'GalleryController@destroy');
});

Route::prefix('appetizers')->group(function () {
    Route::get('all', 'AppetizerController@all');
    Route::post('update', 'AppetizerController@update');
});

Route::prefix('wedding-packages')->group(function () {
    Route::get('all', 'WeddingPackageController@all');
    Route::post('update', 'WeddingPackageController@update');
});

Route::prefix('promo-packages')->group(function () {
    Route::get('all', 'PromoPackageController@all');
    Route::post('update', 'PromoPackageController@update');
});

Route::prefix('party-trays')->group(function () {
    Route::get('all', 'PartyTrayController@all');
    Route::post('update', 'PartyTrayController@update');
});

Route::prefix('events')->group(function () {
    Route::get('all', 'EventController@index');
    Route::post('create', 'EventController@store'); // post because upload is not working in put
    Route::post('{id}', 'EventController@update');
    Route::delete('{id}', 'EventController@destroy');
});

Route::prefix('reserve')->group(function () {
    Route::get('all', 'ReserveController@index');
    Route::put('create', 'ReserveController@store');
    Route::post('{id}', 'ReserveController@update');
    Route::delete('{id}', 'ReserveController@destroy');
});

Route::post('inquiry', 'InquiryController@index');