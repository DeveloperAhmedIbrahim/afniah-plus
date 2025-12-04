<?php

namespace App\Http\Controllers;

use App\Models\Project;
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
}
