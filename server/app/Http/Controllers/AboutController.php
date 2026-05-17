<?php

namespace App\Http\Controllers;

use App\Models\AboutHero;
use App\Models\AboutTeam;
use App\Models\AboutTeamGallery;
use App\Models\AboutVision;
use App\Models\AboutWeAre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class AboutController extends Controller
{
    public function hero(Request $request)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $hero = AboutHero::first();

        return response()->json([
            'status' => true,
            'hero' => $hero,
            'message' => null,
        ]);
    }

    public function whoWeAre(Request $request)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $whoWeAre = AboutWeAre::first();
        return response()->json([
            'status' => true,
            'whoWeAre' => $whoWeAre,
            'message' => null,
        ]);
    }

    public function vision(Request $request)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $vision = AboutVision::first();

        return response()->json([
            'status' => true,
            'vision' => $vision,
            'message' => null,
        ]);
    }

    public function team(Request $request)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $team = AboutTeam::first();

        return response()->json([
            'status' => true,
            'team' => $team,
            'message' => null,
        ]);
    }

    public function teamMembers(Request $request)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $teamMembers = AboutTeamGallery::all();

        return response()->json([
            'status' => true,
            'teamMembers' => $teamMembers,
            'message' => null,
        ]);
    }
}
