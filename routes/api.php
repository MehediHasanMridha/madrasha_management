<?php

use App\Http\Controllers\BlogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// add public routes for blog posts and categories
Route::get('/blog/posts', [BlogController::class, 'showApi']);
// Route::get('/blog/posts/{post}', 'App\Http\Controllers\BlogPostController@show');
// Route::get('/blog/categories', 'App\Http\Controllers\BlogCategoryController@index');
// Route::get('/blog/categories/{category}', 'App\Http\Controllers\BlogCategoryController@show');
// test api route
Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});
