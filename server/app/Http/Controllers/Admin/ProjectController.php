<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectHero;
use App\Models\ProjectPortfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function list(Request $request)
    {
        // English locale set karenge listing ke liye
        App::setLocale('en');
        $projects = Project::orderBy('id', 'DESC')->get();
        
        return response()->json([
            'status' => true,
            'projects' => $projects,
            'message' => null
        ]);
    }

    public function insert(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:5120',
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
                'message' => null
            ], 200);       
        }

        $lang = $request->lang ?? 'en';
        $otherLang = $lang === 'en' ? 'ar' : 'en';

        // Empty arrays banayenge dono languages ke liye
        $title = [$lang => $request->title, $otherLang => ''];
        $category = [$lang => $request->category, $otherLang => ''];
        $location = [$lang => $request->location, $otherLang => ''];
        $description = [$lang => $request->description, $otherLang => ''];
        $caseStudy = [$lang => $request->caseStudy, $otherLang => ''];
        $image = ['en' => '', 'ar' => ''];

        // Direct database mein JSON store karenge
        $project = new Project();
        $project->title = json_encode($title);   
        $project->category = json_encode($category);
        $project->location = json_encode($location);
        $project->description = json_encode($description);
        $project->case_study = json_encode($caseStudy);
        $project->image = json_encode($image);
        $project->save();

        // Image upload
        if($request->hasFile('image')) {
            $uploadPath = public_path("uploads/projects/{$project->id}/");
            
            if (!File::exists($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true);
            }

            $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension();
            $request->file('image')->move($uploadPath, $imageName);
            
            $image[$lang] = url("uploads/projects/{$project->id}/" . $imageName);
            
            // Image column update karenge
            $project->image = json_encode($image);
            $project->save();
        }

        return response()->json([
            'status' => true,
            'project' => $project,
            'message' => 'Project inserted successfully!',
            'navigateTo' => "/admin/project/update/{$project->id}?lang={$lang}",
            'resetForm' => true,
        ]);        
    }

    public function update(Request $request, $id)
    {
        // GET request - Data fetch karenge
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);
            
            // Model apne getters ke through data return karega
            $project = Project::findOrFail($id);
            
            return response()->json([
                'status' => true,
                'project' => $project,
                'message' => null,
            ]);
        } 
        
        // POST request - Data update karenge
        elseif ($request->method() === 'POST') {
            $validator = Validator::make($request->all(), [
                'title' => 'required',
                'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:5120',
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
                ], 200);
            }

            $lang = $request->lang ?? 'en';
            
            // Direct database se raw data fetch karenge (bypass Model getters)
            $projectRaw = DB::table('projects')->where('id', $id)->first();
            
            if (!$projectRaw) {
                return response()->json([
                    'status' => false,
                    'errors' => ['Project not found'],
                    'message' => null,
                ], 404);
            }

            // Raw JSON columns ko decode karenge
            $titleData = json_decode($projectRaw->title, true) ?? ['en' => '', 'ar' => ''];
            $categoryData = json_decode($projectRaw->category, true) ?? ['en' => '', 'ar' => ''];
            $locationData = json_decode($projectRaw->location, true) ?? ['en' => '', 'ar' => ''];
            $descriptionData = json_decode($projectRaw->description, true) ?? ['en' => '', 'ar' => ''];
            $caseStudyData = json_decode($projectRaw->case_study, true) ?? ['en' => '', 'ar' => ''];
            $imageData = json_decode($projectRaw->image, true) ?? ['en' => '', 'ar' => ''];

            // Current language ka data update karenge
            $titleData[$lang] = $request->title;
            $categoryData[$lang] = $request->category;
            $locationData[$lang] = $request->location;
            $descriptionData[$lang] = $request->description;
            $caseStudyData[$lang] = $request->caseStudy;

            // Image upload handling
            if ($request->hasFile('image')) {
                $uploadPath = public_path("uploads/projects/{$id}/");
                
                if (!File::exists($uploadPath)) {
                    File::makeDirectory($uploadPath, 0755, true);
                }

                $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension();
                $request->file('image')->move($uploadPath, $imageName);
                
                // Purani image ko delete kar sakte hain
                if (!empty($imageData[$lang])) {
                    $oldImagePath = str_replace(url('/'), public_path(), $imageData[$lang]);
                    if (File::exists($oldImagePath)) {
                        File::delete($oldImagePath);
                    }
                }
                
                $imageData[$lang] = url("uploads/projects/{$id}/" . $imageName);
            }

            // Direct database update using Query Builder
            DB::table('projects')
                ->where('id', $id)
                ->update([
                    'title' => json_encode($titleData),
                    'category' => json_encode($categoryData),
                    'location' => json_encode($locationData),
                    'description' => json_encode($descriptionData),
                    'case_study' => json_encode($caseStudyData),
                    'image' => json_encode($imageData),
                    'updated_at' => now(),
                ]);

            // Response ke liye Model se data fetch karenge (with getters)
            App::setLocale($lang);
            $updatedProject = Project::find($id);

            return response()->json([
                'status' => true,
                'project' => $updatedProject,
                'message' => 'Project updated successfully!',
            ]);
        }
    }

    public function delete($id)
    {
        $project = Project::findOrFail($id);
        
        // Images folder delete karenge
        $uploadPath = public_path("uploads/projects/{$id}/");
        if (File::exists($uploadPath)) {
            File::deleteDirectory($uploadPath);
        }
        
        $project->delete();

        return response()->json([
            'status' => true,
            'message' => 'Project deleted successfully!'
        ]);
    }

    public function hero(Request $request)
    {
        // GET request - Data fetch karenge
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);
            
            // Model apne getters ke through data return karega
            $hero = ProjectHero::first();
            
            if($hero === null) {
                $hero = new ProjectHero();
                $hero->title = json_encode(['en' => '', 'ar' => '']);
                $hero->subtitle = json_encode(['en' => '', 'ar' => '']);
                $hero->image = '';
                $hero->save();
            }

            return response()->json([
                'status' => true,
                'hero' => ProjectHero::first(),
                'message' => null,
            ]);
        } 
        
        // POST request - Data update karenge
        elseif ($request->method() === 'POST') {
            $validator = Validator::make($request->all(), [
                'title' => 'required',
                'subtitle' => 'required',
                'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:5120',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()->all(),
                    'message' => null,
                ], 200);
            }

            $lang = $request->lang ?? 'en';
            
            // Direct database se raw data fetch karenge (bypass Model getters)
            $projectRaw = DB::table('project_heroes')->first();
            
            if (!$projectRaw) {
                return response()->json([
                    'status' => false,
                    'errors' => ['Project not found'],
                    'message' => null,
                ], 404);
            }

            // Raw JSON columns ko decode karenge
            $titleData = json_decode($projectRaw->title, true) ?? ['en' => '', 'ar' => ''];
            $subTitleData = json_decode($projectRaw->subtitle, true) ?? ['en' => '', 'ar' => ''];
            $imageData = json_decode($projectRaw->image, true) ?? ['en' => '', 'ar' => ''];

            // Current language ka data update karenge
            $titleData[$lang] = $request->title;
            $subTitleData[$lang] = $request->subtitle;

            // Image upload handling
            if ($request->hasFile('image')) {
                $uploadPath = public_path("uploads/projects/hero/");
                
                if (!File::exists($uploadPath)) {
                    File::makeDirectory($uploadPath, 0755, true);
                }

                $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension();
                $request->file('image')->move($uploadPath, $imageName);
                
                // Purani image ko delete kar sakte hain
                if (!empty($imageData[$lang])) {
                    $oldImagePath = str_replace(url('/'), public_path(), $imageData[$lang]);
                    if (File::exists($oldImagePath)) {
                        File::delete($oldImagePath);
                    }
                }
                
                $imageData[$lang] = url("uploads/projects/hero/" . $imageName);
            }

            // Direct database update using Query Builder
            DB::table('project_heroes')
            ->where('id', 1)
            ->update([
                'title' => json_encode($titleData),
                'subtitle' => json_encode($subTitleData),
                'image' => json_encode($imageData),
                'updated_at' => now(),
            ]);

            // Response ke liye Model se data fetch karenge (with getters)
            App::setLocale($lang);

            return response()->json([
                'status' => true,
                'project' => ProjectHero::first(),
                'message' => 'Project hero updated successfully!',
                // 'navigateTo' => "/admin/project/hero?lang=en",
            ]);
        }
    }

    public function portfolio(Request $request)
    {
        // GET request - Data fetch karenge
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);
            
            // Model apne getters ke through data return karega
            $portfolio = ProjectPortfolio::first();
            
            if($portfolio === null) {
                $portfolio = new ProjectPortfolio();
                $portfolio->title = json_encode(['en' => '', 'ar' => '']);
                $portfolio->toptitle = json_encode(['en' => '', 'ar' => '']);
                $portfolio->subtitle = json_encode(['en' => '', 'ar' => '']);
                $portfolio->save();
            }

            return response()->json([
                'status' => true,
                'portfolio' => ProjectPortfolio::first(),
                'message' => null,
            ]);
        } 
        
        // POST request - Data update karenge
        elseif ($request->method() === 'POST') {
            $validator = Validator::make($request->all(), [
                'title' => 'required',
                'toptitle' => 'required',
                'subtitle' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()->all(),
                    'message' => null,
                ], 200);
            }

            $lang = $request->lang ?? 'en';
            
            // Direct database se raw data fetch karenge (bypass Model getters)
            $projectRaw = DB::table('project_portfolios')->first();
            
            if (!$projectRaw) {
                return response()->json([
                    'status' => false,
                    'errors' => ['Project not found'],
                    'message' => null,
                ], 404);
            }

            // Raw JSON columns ko decode karenge
            $titleData = json_decode($projectRaw->title, true) ?? ['en' => '', 'ar' => ''];
            $topTitleData = json_decode($projectRaw->toptitle, true) ?? ['en' => '', 'ar' => ''];
            $subTitleData = json_decode($projectRaw->subtitle, true) ?? ['en' => '', 'ar' => ''];

            // Current language ka data update karenge
            $titleData[$lang] = $request->title;
            $topTitleData[$lang] = $request->toptitle;
            $subTitleData[$lang] = $request->subtitle;


            // Direct database update using Query Builder
            DB::table('project_portfolios')
            ->where('id', 1)
            ->update([
                'title' => json_encode($titleData),
                'toptitle' => json_encode($topTitleData),
                'subtitle' => json_encode($subTitleData),
                'updated_at' => now(),
            ]);

            // Response ke liye Model se data fetch karenge (with getters)
            App::setLocale($lang);

            return response()->json([
                'status' => true,
                'project' => ProjectPortfolio::first(),
                'message' => 'Project portfolio updated successfully!',
                // 'navigateTo' => "/admin/project/portfolio?lang=en",
            ]);
        }
    }    

}