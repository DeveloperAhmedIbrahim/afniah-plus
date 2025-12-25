<?php

use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\HomeController as AdminHomeController;
use App\Http\Controllers\Admin\AboutController as AdminAboutController;
use App\Http\Controllers\Admin\ProjectGalleryController as AdminProjectGalleryController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\ContactController as AdminContactController;
use App\Http\Controllers\Admin\OthersController as AdminOthersController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::prefix('admin')->group(function() {
    Route::post('login', [AdminAuthController::class, 'login']);
    Route::get('dashboard/stats', [AdminAuthController::class, 'stats']);
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
    Route::prefix('about')->group(function() {
        Route::match(['GET', 'POST'], 'hero', [AdminAboutController::class, 'hero']);
        Route::match(['GET', 'POST'], 'who-we-are', [AdminAboutController::class, 'whoWeAre']);
        Route::match(['GET', 'POST'], 'vision', [AdminAboutController::class, 'vision']);
        Route::match(['GET', 'POST'], 'team', [AdminAboutController::class, 'team']);
        Route::get('team/gallery/list', [AdminAboutController::class, 'teamGalleryList']);
        Route::post('team/gallery/insert', [AdminAboutController::class, 'teamGalleryInsert']);
        Route::match(['GET', 'POST'], 'team/gallery/update/{id}', [AdminAboutController::class, 'teamGalleryUpdate']);
        Route::delete('team/gallery/delete/{id}', [AdminAboutController::class, 'teamGalleryDelete']);
        Route::match(['GET', 'POST'], 'voice', [AdminAboutController::class, 'voice']);
        Route::get('voice/bullet/list', [AdminAboutController::class, 'voiceBulletList']);
        Route::post('voice/bullet/insert', [AdminAboutController::class, 'voiceBulletInsert']);
        Route::post('voice/bullet/update/{id}', [AdminAboutController::class, 'voiceBulletUpdate']);
        Route::delete('voice/bullet/delete/{id}', [AdminAboutController::class, 'voiceBulletDelete']);
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
    Route::prefix('service')->group(function() {
        Route::match(['GET', 'POST'], 'hero', [AdminServiceController::class, 'hero']);
        Route::match(['GET', 'POST'], 'what-we-offer', [AdminServiceController::class, 'whatWeOffer']);
        Route::get('list', [AdminServiceController::class, 'list']);
        Route::post('insert', [AdminServiceController::class, 'insert']);
        Route::match(['GET', 'POST'], 'update/{id}', [AdminServiceController::class, 'update']);
        Route::delete('delete/{id}', [AdminServiceController::class, 'delete']);
        Route::match(['GET', 'POST'], '{id}/section-01', [AdminServiceController::class, 'section01']);
        Route::get('{id}/section-01/bullet/list', [AdminServiceController::class, 'section01BulletList']);
        Route::post('{id}/section-01/bullet/insert', [AdminServiceController::class, 'section01BulletInsert']);
        Route::match(['GET', 'POST'], '{id}/section-01/bullet/update/{bulletId}', [AdminServiceController::class, 'section01BulletUpdate']);
        Route::delete('{id}/section-01/bullet/delete/{bulletId}', [AdminServiceController::class, 'section01BulletDelete']);
        Route::match(['GET', 'POST'], '{id}/section-02', [AdminServiceController::class, 'section02']);
        Route::get('{id}/section-02/bullet/list', [AdminServiceController::class, 'section02BulletList']);
        Route::post('{id}/section-02/bullet/insert', [AdminServiceController::class, 'section02BulletInsert']);
        Route::match(['GET', 'POST'], '{id}/section-02/bullet/update/{bulletId}', [AdminServiceController::class, 'section02BulletUpdate']);
        Route::delete('{id}/section-02/bullet/delete/{bulletId}', [AdminServiceController::class, 'section02BulletDelete']);
        Route::match(['GET', 'POST'], '{id}/section-03', [AdminServiceController::class, 'section03']);
        Route::get('{id}/section-03/bullet/list', [AdminServiceController::class, 'section03BulletList']);
        Route::post('{id}/section-03/bullet/insert', [AdminServiceController::class, 'section03BulletInsert']);
        Route::match(['GET', 'POST'], '{id}/section-03/bullet/update/{bulletId}', [AdminServiceController::class, 'section03BulletUpdate']);
        Route::delete('{id}/section-03/bullet/delete/{bulletId}', [AdminServiceController::class, 'section03BulletDelete']);
    });
    Route::prefix('contact')->group(function() {
        Route::match(['GET', 'POST'], 'hero', [AdminContactController::class, 'hero']);
        Route::match(['GET', 'POST'], 'form', [AdminContactController::class, 'form']);
    });
    Route::prefix('others')->group(function() {
        Route::match(['GET', 'POST'], 'social-details', [AdminOthersController::class, 'socialDetails']);
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

Route::prefix('about')->group(function() {
    Route::get('hero', [AboutController::class, 'hero']);
    Route::get('who-we-are', [AboutController::class, 'whoWeAre']);
    Route::get('vision', [AboutController::class, 'vision']);
    Route::get('team', [AboutController::class, 'team']);
    Route::get('team/members', [AboutController::class, 'teamMembers']);
});

Route::prefix('project')->group(function() {
    Route::get('hero', [ProjectController::class, 'hero']);
    Route::get('list', [ProjectController::class, 'list']);
    Route::get('portfolio', [ProjectController::class, 'portfolio']);
    Route::get('single/{id}', [ProjectController::class, 'single']);
    Route::get('{id}/gallery', [ProjectController::class, 'gallery']);
});

Route::prefix('contact')->group(function() {
    Route::get('hero', [ContactController::class, 'hero']);
    Route::get('form', [ContactController::class, 'form']);
    Route::post('submit', [ContactController::class, 'submit']);
});