<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectGallery;
use App\Models\ProjectHero;
use App\Models\ProjectPortfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class ProjectController extends Controller
{
    public function list(Request $request)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $projects = Project::orderBy('id', 'DESC')->get();
        return response()->json([
            'status' => true,
            'projects' => $projects,
            'message' => null
        ]);
    }

    public function single(Request $request, $id)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $project = Project::find($id);
        return response()->json([
            'status' => true,
            'project' => $project,
            'message' => null
        ]);
    }    

    public function gallery(Request $request, $id)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $gallery = ProjectGallery::whereProjectId($id)->get();
        return response()->json([
            'status' => true,
            'gallery' => $gallery,
            'message' => null
        ]);
    }

    public function hero(Request $request)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $hero = ProjectHero::first();

        return response()->json([
            'status' => true,
            'hero' => $hero,
            'message' => null,
        ]);
    }

    public function portfolio(Request $request)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $portfolio = ProjectPortfolio::first();
        return response()->json([
            'status' => true,
            'portfolio' => $portfolio,
            'message' => null,
        ]);
    }
}
