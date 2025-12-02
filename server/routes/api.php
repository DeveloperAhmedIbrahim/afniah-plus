<?php

use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
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
    });
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('contact', [PublicController::class, 'contact']);