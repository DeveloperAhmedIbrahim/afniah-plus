<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function list(Request $request)
    {
        $projects = Project::orderBy('id', 'DESC')->get();
        return response()->json([
            'status' => true,
            'projects' => $projects,
            'message' => NULL
        ]);
    }

    public function insert(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'image' => 'file|mimes:jpeg,png,jpg,gif,svg',
            'category' => 'required',
            'location' => 'required',
            'description' => 'required',
            'caseStudy' => 'required',
        ]);

        if($validator->fails()) 
        {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all(),
                'message' => NULL
            ]);       
        }

        // Logic to insert a new project
        if($request->lang == "en") {
            $title = ['en' => $request->title, 'ar' => ""];
            $category = ['en' => $request->category, 'ar' => ""];
            $location = ['en' => $request->location, 'ar' => ""];
            $description = ['en' => $request->description, 'ar' => ""];
            $caseStudy = ['en' => $request->caseStudy, 'ar' => ""];
        } else {
            $title = ['en' => "", 'ar' => $request->title];
            $category = ['en' => "", 'ar' => $request->category];
            $location = ['en' => "", 'ar' => $request->location];
            $description = ['en' => "", 'ar' => $request->description];
            $caseStudy = ['en' => "", 'ar' => $request->caseStudy];
        }

        $project = new Project();
        $project->title = json_encode($title);   
        $project->category = json_encode($category);
        $project->location = json_encode($location);
        $project->description = json_encode($description);
        $project->case_study = json_encode($caseStudy);
        $project->save();

        if($request->hasFile('image')) {
            $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension();
            $request->file('image')->move(public_path("uploads/projects/{$project->id}/"), $imageName);
            $project->image = json_encode([
                'en' => $request->lang == "en" ? url("uploads/projects/{$project->id}/" . $imageName) : '',
                'ar' => $request->lang == "ar" ? url("uploads/projects/{$project->id}/" . $imageName) : '',
            ]);
    
            $project->save();
        } 


        return response()->json([
            'status' => true,
            'project' => Project::find($project->id),
            'message' => 'Project Inserted Successfully!!.',
            'navigateTo' => "/admin/project/update/{$project->id}?lang={$request->lang}",
        ]);        
    }

    public function update(Request $request, $id)
    {
        if ($request->method() === 'GET') {
            App::setlocale($request->lang ?? 'en');
            $project = Project::findOrFail($id);
            return response()->json([
                'status' => true,
                'project' => $project,
                'message' => null,
            ]);
        } elseif ($request->method() === 'POST') {
            $validator = Validator::make($request->all(), [
                'title' => 'required',
                'image' => 'file|mimes:jpeg,png,jpg,gif,svg',
                'category' => 'required',
                'location' => 'required',
                'description' => 'required',
                'caseStudy' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()->all(),
                    'message' => null,
                ]);
            }

            $project =  DB::table('projects')->where('id', $id)->lockForUpdate()->get();

            $lang = $request->lang ?? 'en';
            $otherLang = $lang === 'en' ? 'ar' : 'en';

            // Decode existing
            $title = json_decode($project->title, true);
            $category = json_decode($project->category, true);
            $location = json_decode($project->location, true);
            $description = json_decode($project->description, true);
            $caseStudy = json_decode($project->case_study, true);
            $image = json_decode($project->image, true) ?? ['en' => '', 'ar' => ''];

            // Update lang specific
            $title[$lang] = $request->title;
            $category[$lang] = $request->category;
            $location[$lang] = $request->location;
            $description[$lang] = $request->description;
            $caseStudy[$lang] = $request->caseStudy;

            if ($request->hasFile('image')) {
                $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension();
                $request->file('image')->move(public_path("uploads/projects/{$project->id}/"), $imageName);
                $image[$lang] = url("uploads/projects/{$project->id}/" . $imageName);
            }

            $project = Project::findOrFail($id);

            // Save back
            $project->title = json_encode($title);
            $project->category = json_encode($category);
            $project->location = json_encode($location);
            $project->description = json_encode($description);
            $project->case_study = json_encode($caseStudy);
            $project->image = json_encode($image);
            $project->save();

            return response()->json([
                'status' => true,
                'project' => $project,
                'message' => 'Project Updated Successfully!!.',
            ]);
        }
    }

    public function delete($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return response()->json([
            'status' => true,
            'message' => 'Project Deleted Successfully!!.'
        ]);
    }
}