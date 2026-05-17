<?php

namespace App\Http\Controllers;

use App\Models\HomeAbout;
use App\Models\HomeAboutBullet;
use App\Models\HomeHero;
use App\Models\HomeHeroGallery;
use App\Models\HomeLocation;
use App\Models\HomeProject;
use App\Models\Section;
use App\Models\SocialDetail;
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

    public function social(Request $request)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $social = SocialDetail::first();

        return response()->json([
            'status' => true,
            'social' => $social,
            'message' => null,
        ]);
    }    

    public function getVisibility(Request $request)
    {
        App::setLocale($request->header('Accept-Language', 'en'));

        $visibility = [
            'home_about' => Section::where('name', 'home_about')->first()->status,
            'home_projects' => Section::where('name', 'home_projects')->first()->status,
            'home_location' => Section::where('name', 'home_location')->first()->status,

            'about_whoWeAre' => Section::where('name', 'about_whoWeAre')->first()->status,
            'about_vision' => Section::where('name', 'about_vision')->first()->status,
            'about_team' => Section::where('name', 'about_team')->first()->status,

            'projects_overview' => Section::where('name', 'projects_overview')->first()->status,
            'projects_scope' => Section::where('name', 'projects_scope')->first()->status,
            'projects_impact' => Section::where('name', 'projects_impact')->first()->status,
            'projects_caseStudy' => Section::where('name', 'projects_caseStudy')->first()->status,
            'projects_gallery' => Section::where('name', 'projects_gallery')->first()->status,
            
            'service_section01' => Section::where('name', 'service_section01')->first()->status,
            'service_section02' => Section::where('name', 'service_section02')->first()->status,
            'service_section03' => Section::where('name', 'service_section03')->first()->status,
        ];
        
        return response()->json([
            'status' => true,
            'visibility' => $visibility,
            'message' => null,
        ]);
    }
}
