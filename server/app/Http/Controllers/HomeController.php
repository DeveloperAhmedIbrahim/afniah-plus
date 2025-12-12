<?php

namespace App\Http\Controllers;

use App\Models\HomeAbout;
use App\Models\HomeAboutBullet;
use App\Models\HomeHero;
use App\Models\HomeHeroGallery;
use App\Models\HomeLocation;
use App\Models\HomeProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class HomeController extends Controller
{
    public function hero(Request $request)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $hero = HomeHero::first();

        return response()->json([
            'status' => true,
            'hero' => $hero,
            'message' => null,
        ]);
    }

    public function heroGallery(Request $request)
    {
        $gallery = HomeHeroGallery::all();

        return response()->json([
            'status' => true,
            'gallery' => $gallery,
            'message' => null,
        ]);
    }

    public function about(Request $request)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $about = HomeAbout::first();

        return response()->json([
            'status' => true,
            'about' => $about,
            'message' => null,
        ]);
    }

    public function aboutBullets(Request $request)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $about = HomeAboutBullet::all();

        return response()->json([
            'status' => true,
            'bullets' => $about,
            'message' => null,
        ]);
    }

    public function project(Request $request)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $project = HomeProject::first();

        return response()->json([
            'status' => true,
            'project' => $project,
            'message' => null,
        ]);
    }

    public function location(Request $request)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $location = HomeLocation::first();

        return response()->json([
            'status' => true,
            'location' => $location,
            'message' => null,
        ]);
    }
}
