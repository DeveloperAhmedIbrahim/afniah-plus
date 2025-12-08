<?php

use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\ProjectGalleryController as AdminProjectGalleryController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PublicController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function() {
    Route::post('login', [AdminAuthController::class, 'login']);
    Route::prefix('project')->group(function() {
        Route::get('list', [AdminProjectController::class, 'list']);
        Route::post('insert', [AdminProjectController::class, 'insert']);
        Route::match(['GET', 'POST'], 'update/{id}', [AdminProjectController::class, 'update']);
        Route::delete('delete/{id}', [AdminProjectController::class, 'delete']);
        Route::post('{projectId}/gallery/insert', [AdminProjectGalleryController::class, 'insert']);
        Route::get('{projectId}/gallery', [AdminProjectGalleryController::class, 'list']);
        Route::post('{projectId}/gallery/update/{id}', [AdminProjectGalleryController::class, 'update']);
        Route::delete('{projectId}/gallery/delete/{id}', [AdminProjectGalleryController::class, 'delete']);
        Route::match(['GET', 'POST'], 'hero', [AdminProjectController::class, 'hero']);
        Route::match(['GET', 'POST'], 'portfolio', [AdminProjectController::class, 'portfolio']);
    });
});


Route::prefix('project')->group(function() {
    Route::get('list', [ProjectController::class, 'list']);
    Route::get('single/{id}', [ProjectController::class, 'single']);
    Route::get('{id}/gallery', [ProjectController::class, 'gallery']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('contact', [PublicController::class, 'contact']);