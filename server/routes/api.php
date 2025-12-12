<?php

use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\HomeController as AdminHomeController;
use App\Http\Controllers\Admin\ProjectGalleryController as AdminProjectGalleryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PublicController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function() {
    Route::post('login', [AdminAuthController::class, 'login']);
    Route::prefix('home')->group(function() {
        Route::match(['GET', 'POST'], 'hero', [AdminHomeController::class, 'hero']);
        Route::get('hero/gallery/list', [AdminHomeController::class, 'heroGalleryList']);
        Route::post('hero/gallery/insert', [AdminHomeController::class, 'heroGalleryInsert']);
        Route::post('hero/gallery/update/{id}', [AdminHomeController::class, 'heroGalleryUpdate']);
        Route::delete('hero/gallery/delete/{id}', [AdminHomeController::class, 'heroGalleryDelete']);
        Route::match(['GET', 'POST'], 'about', [AdminHomeController::class, 'about']);
        Route::get('about/bullet/list', [AdminHomeController::class, 'aboutBulletList']);
        Route::post('about/bullet/insert', [AdminHomeController::class, 'aboutBulletInsert']);
        Route::match(['GET', 'POST'], 'about/bullet/update/{id}', [AdminHomeController::class, 'aboutBulletUpdate']);
        Route::delete('about/bullet/delete/{id}', [AdminHomeController::class, 'aboutBulletDelete']);
        Route::match(['GET', 'POST'], 'project', [AdminHomeController::class, 'project']);
        Route::match(['GET', 'POST'], 'location', [AdminHomeController::class, 'location']);
    });
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

Route::prefix('home')->group(function() {
    Route::get('hero', [HomeController::class, 'hero']);
    Route::get('hero/gallery', [HomeController::class, 'heroGallery']);
    Route::get('about', [HomeController::class, 'about']);
    Route::get('about/bullets', [HomeController::class, 'aboutBullets']);
    Route::get('project', [HomeController::class, 'project']);
    Route::get('location', [HomeController::class, 'location']);
});

Route::prefix('project')->group(function() {
    Route::get('hero', [ProjectController::class, 'hero']);
    Route::get('list', [ProjectController::class, 'list']);
    Route::get('portfolio', [ProjectController::class, 'portfolio']);
    Route::get('single/{id}', [ProjectController::class, 'single']);
    Route::get('{id}/gallery', [ProjectController::class, 'gallery']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('contact', [PublicController::class, 'contact']);