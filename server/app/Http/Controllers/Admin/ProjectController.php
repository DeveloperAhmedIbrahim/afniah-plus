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
            'title'          => 'required',
            'category'       => 'required',
            'location'       => 'required',
            'description'    => 'required',
            'caseStudy'      => 'required',
            'featuredImage'  => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:5120',
            'bannerImage'    => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:5120',
            'caseStudyImage' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:5120',
            'scopeImage'     => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:5120',
            'impactImage'    => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => false,
                'errors'  => $validator->errors()->all(),
                'message' => null
            ], 200);
        }

        $lang      = $request->lang ?? 'en';
        $otherLang = $lang === 'en' ? 'ar' : 'en';

        // Empty arrays banayenge dono languages ke liye
        $title          = [$lang => $request->title,          $otherLang => ''];
        $category       = [$lang => $request->category,       $otherLang => ''];
        $location       = [$lang => $request->location,       $otherLang => ''];
        $description    = [$lang => $request->description,    $otherLang => ''];
        $caseStudy      = [$lang => $request->caseStudy,      $otherLang => ''];
        $scopeOfProject = [$lang => $request->scopeOfProject ?? '', $otherLang => ''];
        $projectImpact  = [$lang => $request->projectImpact  ?? '', $otherLang => ''];

        $featuredImage  = ['en' => '', 'ar' => ''];
        $bannerImage    = ['en' => '', 'ar' => ''];
        $caseStudyImage = ['en' => '', 'ar' => ''];
        $scopeImage     = ['en' => '', 'ar' => ''];
        $impactImage    = ['en' => '', 'ar' => ''];

        // Save project record
        $project = new Project();
        $project->title           = json_encode($title);
        $project->category        = json_encode($category);
        $project->location        = json_encode($location);
        $project->description     = json_encode($description);
        $project->case_study      = json_encode($caseStudy);
        $project->scope = json_encode($scopeOfProject);
        $project->impact  = json_encode($projectImpact);
        $project->featured_image  = json_encode($featuredImage);
        $project->banner_image    = json_encode($bannerImage);
        $project->case_study_image = json_encode($caseStudyImage);
        $project->scope_image     = json_encode($scopeImage);
        $project->impact_image    = json_encode($impactImage);
        $project->show_on_home    = $request->showOnHome;
        $project->save();

        $uploadPath = public_path("uploads/projects/{$project->id}/");
        if (!File::exists($uploadPath)) {
            File::makeDirectory($uploadPath, 0755, true);
        }

        // Featured image upload
        if ($request->hasFile('featuredImage')) {
            $imageName = time() . '.' . $request->file('featuredImage')->getClientOriginalExtension();
            $request->file('featuredImage')->move($uploadPath, $imageName);
            $featuredImage[$lang] = "uploads/projects/{$project->id}/{$imageName}";
            $project->featured_image = json_encode($featuredImage);
        }

        // Banner image upload
        if ($request->hasFile('bannerImage')) {
            $imageName = rand(1111, 9999) . time() . '.' . $request->file('bannerImage')->getClientOriginalExtension();
            $request->file('bannerImage')->move($uploadPath, $imageName);
            $bannerImage[$lang] = "uploads/projects/{$project->id}/{$imageName}";
            $project->banner_image = json_encode($bannerImage);
        }

        // Case study image upload
        if ($request->hasFile('caseStudyImage')) {
            $imageName = rand(1111, 9999) . time() . '.' . $request->file('caseStudyImage')->getClientOriginalExtension();
            $request->file('caseStudyImage')->move($uploadPath, $imageName);
            $caseStudyImage[$lang] = "uploads/projects/{$project->id}/{$imageName}";
            $project->case_study_image = json_encode($caseStudyImage);
        }

        // Scope of project image upload
        if ($request->showScopeImage == 1) {
            if ($request->hasFile('scopeImage')) {
                $imageName = rand(1111, 9999) . time() . '.' . $request->file('scopeImage')->getClientOriginalExtension();
                $request->file('scopeImage')->move($uploadPath, $imageName);
                $scopeImage[$lang] = "uploads/projects/{$project->id}/{$imageName}";
                $project->scope_image = json_encode($scopeImage);
            }
        } 

        // Project impact image upload
        if ($request->showImpactImage == 1) {
            if ($request->hasFile('impactImage')) {
                $imageName = rand(1111, 9999) . time() . '.' . $request->file('impactImage')->getClientOriginalExtension();
                $request->file('impactImage')->move($uploadPath, $imageName);
                $impactImage[$lang] = "uploads/projects/{$project->id}/{$imageName}";
                $project->impact_image = json_encode($impactImage);
            }
        }

        $project->save();

        return response()->json([
            'status'     => true,
            'project'    => $project,
            'message'    => 'Project inserted successfully!',
            'navigateTo' => "/admin/project/update/{$project->id}?lang={$lang}",
            'resetForm'  => true,
        ]);
    }

    public function update(Request $request, $id)
    {
        // GET request - Data fetch karenge
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);

            $project = Project::findOrFail($id);

            return response()->json([
                'status'  => true,
                'project' => $project,
                'message' => null,
            ]);
        }

        // POST request - Data update karenge
        elseif ($request->method() === 'POST') {
            $validator = Validator::make($request->all(), [
                'title'          => 'required',
                'category'       => 'required',
                'location'       => 'required',
                'description'    => 'required',
                'caseStudy'      => 'required',
                'featuredImage'  => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:5120',
                'bannerImage'    => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:5120',
                'caseStudyImage' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:5120',
                'scopeImage'     => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:5120',
                'impactImage'    => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:5120',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'errors'  => $validator->errors()->all(),
                    'message' => null,
                ], 200);
            }

            $lang = $request->lang ?? 'en';

            // Direct database se raw data fetch karenge (bypass Model getters)
            $projectRaw = DB::table('projects')->where('id', $id)->first();

            if (!$projectRaw) {
                return response()->json([
                    'status'  => false,
                    'errors'  => ['Project not found'],
                    'message' => null,
                ], 404);
            }

            // Raw JSON columns ko decode karenge
            $titleData          = json_decode($projectRaw->title,            true) ?? ['en' => '', 'ar' => ''];
            $categoryData       = json_decode($projectRaw->category,         true) ?? ['en' => '', 'ar' => ''];
            $locationData       = json_decode($projectRaw->location,         true) ?? ['en' => '', 'ar' => ''];
            $descriptionData    = json_decode($projectRaw->description,      true) ?? ['en' => '', 'ar' => ''];
            $caseStudyData      = json_decode($projectRaw->case_study,       true) ?? ['en' => '', 'ar' => ''];
            $scopeOfProjectData = json_decode($projectRaw->scope ?? 'null', true) ?? ['en' => '', 'ar' => ''];
            $projectImpactData  = json_decode($projectRaw->impact   ?? 'null', true) ?? ['en' => '', 'ar' => ''];
            $featuredImageData  = json_decode($projectRaw->featured_image,   true) ?? ['en' => '', 'ar' => ''];
            $bannerImageData    = json_decode($projectRaw->banner_image,     true) ?? ['en' => '', 'ar' => ''];
            $caseStudyImageData = json_decode($projectRaw->case_study_image, true) ?? ['en' => '', 'ar' => ''];
            $scopeImageData     = json_decode($projectRaw->scope_image      ?? 'null', true) ?? ['en' => '', 'ar' => ''];
            $impactImageData    = json_decode($projectRaw->impact_image     ?? 'null', true) ?? ['en' => '', 'ar' => ''];

            // Current language ka data update karenge
            $titleData[$lang]          = $request->title;
            $categoryData[$lang]       = $request->category;
            $locationData[$lang]       = $request->location;
            $descriptionData[$lang]    = $request->description;
            $caseStudyData[$lang]      = $request->caseStudy;
            $scopeOfProjectData[$lang] = $request->scopeOfProject ?? '';
            $projectImpactData[$lang]  = $request->projectImpact  ?? '';

            $uploadPath = public_path("uploads/projects/{$id}/");
            if (!File::exists($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true);
            }

            // Featured image upload
            if ($request->hasFile('featuredImage')) {
                $this->deleteOldImage($featuredImageData[$lang]);
                $imageName = time() . '.' . $request->file('featuredImage')->getClientOriginalExtension();
                $request->file('featuredImage')->move($uploadPath, $imageName);
                $featuredImageData[$lang] = "uploads/projects/{$id}/{$imageName}";
            }

            // Banner image upload
            if ($request->hasFile('bannerImage')) {
                $this->deleteOldImage($bannerImageData[$lang]);
                $imageName = rand(1111, 9999) . time() . '.' . $request->file('bannerImage')->getClientOriginalExtension();
                $request->file('bannerImage')->move($uploadPath, $imageName);
                $bannerImageData[$lang] = "uploads/projects/{$id}/{$imageName}";
            }

            // Case study image upload
            if ($request->hasFile('caseStudyImage')) {
                $this->deleteOldImage($caseStudyImageData[$lang]);
                $imageName = rand(1111, 9999) . time() . '.' . $request->file('caseStudyImage')->getClientOriginalExtension();
                $request->file('caseStudyImage')->move($uploadPath, $imageName);
                $caseStudyImageData[$lang] = "uploads/projects/{$id}/{$imageName}";
            }

            // Scope of project image upload
            if ($request->showScopeImage == 1) {
                if ($request->hasFile('scopeImage')) {
                    $this->deleteOldImage($scopeImageData[$lang] ?? '');
                    $imageName = rand(1111, 9999) . time() . '.' . $request->file('scopeImage')->getClientOriginalExtension();
                    $request->file('scopeImage')->move($uploadPath, $imageName);
                    $scopeImageData[$lang] = "uploads/projects/{$id}/{$imageName}";
                }
            } else {
                // Agar checkbox unchecked hai to old image delete karenge aur path ko empty kar denge
                $this->deleteOldImage($scopeImageData[$lang] ?? '');
                $scopeImageData[$lang] = '';
            }

            // Project impact image upload
            if ($request->showImpactImage == 1) {
                if ($request->hasFile('impactImage')) {
                    $this->deleteOldImage($impactImageData[$lang] ?? '');
                    $imageName = rand(1111, 9999) . time() . '.' . $request->file('impactImage')->getClientOriginalExtension();
                    $request->file('impactImage')->move($uploadPath, $imageName);
                    $impactImageData[$lang] = "uploads/projects/{$id}/{$imageName}";
                }
            } else {    
                // Agar checkbox unchecked hai to old image delete karenge aur path ko empty kar denge
                $this->deleteOldImage($impactImageData[$lang] ?? '');
                $impactImageData[$lang] = '';
            }

            // Direct database update using Query Builder
            DB::table('projects')
                ->where('id', $id)
                ->update([
                    'title'            => json_encode($titleData),
                    'category'         => json_encode($categoryData),
                    'location'         => json_encode($locationData),
                    'description'      => json_encode($descriptionData),
                    'case_study'       => json_encode($caseStudyData),
                    'scope'            => json_encode($scopeOfProjectData),
                    'impact'           => json_encode($projectImpactData),
                    'featured_image'   => json_encode($featuredImageData),
                    'banner_image'     => json_encode($bannerImageData),
                    'case_study_image' => json_encode($caseStudyImageData),
                    'scope_image'      => json_encode($scopeImageData),
                    'impact_image'     => json_encode($impactImageData),
                    'show_on_home'     => $request->showOnHome,
                    'updated_at'       => now(),
                ]);

            // Response ke liye Model se data fetch karenge (with getters)
            App::setLocale($lang);
            $updatedProject = Project::find($id);

            return response()->json([
                'status'  => true,
                'project' => $updatedProject,
                'message' => 'Project updated successfully!',
            ]);
        }
    }

    /**
     * Helper: delete an old image file if it exists on disk.
     */
    private function deleteOldImage(string $path): void
    {
        if (!empty($path)) {
            $fullPath = public_path($path);
            if (File::exists($fullPath)) {
                File::delete($fullPath);
            }
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
            'status'  => true,
            'message' => 'Project deleted successfully!'
        ]);
    }

    public function hero(Request $request)
    {
        // GET request - Data fetch karenge
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);

            $hero = ProjectHero::first();

            if ($hero === null) {
                $hero = new ProjectHero();
                $hero->title    = json_encode(['en' => '', 'ar' => '']);
                $hero->subtitle = json_encode(['en' => '', 'ar' => '']);
                $hero->image    = '';
                $hero->save();
            }

            return response()->json([
                'status'  => true,
                'hero'    => ProjectHero::first(),
                'message' => null,
            ]);
        }

        // POST request - Data update karenge
        elseif ($request->method() === 'POST') {
            $validator = Validator::make($request->all(), [
                'title'    => 'required',
                'subtitle' => 'required',
                'image'    => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:5120',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'errors'  => $validator->errors()->all(),
                    'message' => null,
                ], 200);
            }

            $lang = $request->lang ?? 'en';

            $projectRaw = DB::table('project_heroes')->first();

            if (!$projectRaw) {
                return response()->json([
                    'status'  => false,
                    'errors'  => ['Project not found'],
                    'message' => null,
                ], 404);
            }

            $titleData    = json_decode($projectRaw->title,    true) ?? ['en' => '', 'ar' => ''];
            $subTitleData = json_decode($projectRaw->subtitle, true) ?? ['en' => '', 'ar' => ''];
            $imageData    = json_decode($projectRaw->image,    true) ?? ['en' => '', 'ar' => ''];

            $titleData[$lang]    = $request->title;
            $subTitleData[$lang] = $request->subtitle;

            if ($request->hasFile('image')) {
                $uploadPath = public_path("uploads/projects/hero/");

                if (!File::exists($uploadPath)) {
                    File::makeDirectory($uploadPath, 0755, true);
                }

                $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension();
                $request->file('image')->move($uploadPath, $imageName);

                if (!empty($imageData[$lang])) {
                    $oldImagePath = public_path($imageData[$lang]);
                    if (File::exists($oldImagePath)) {
                        File::delete($oldImagePath);
                    }
                }

                $imageData[$lang] = "uploads/projects/hero/" . $imageName;
            }

            DB::table('project_heroes')
                ->where('id', 1)
                ->update([
                    'title'      => json_encode($titleData),
                    'subtitle'   => json_encode($subTitleData),
                    'image'      => json_encode($imageData),
                    'updated_at' => now(),
                ]);

            App::setLocale($lang);

            return response()->json([
                'status'  => true,
                'project' => ProjectHero::first(),
                'message' => 'Project hero updated successfully!',
            ]);
        }
    }

    public function portfolio(Request $request)
    {
        // GET request - Data fetch karenge
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);

            $portfolio = ProjectPortfolio::first();

            if ($portfolio === null) {
                $portfolio = new ProjectPortfolio();
                $portfolio->title    = json_encode(['en' => '', 'ar' => '']);
                $portfolio->toptitle = json_encode(['en' => '', 'ar' => '']);
                $portfolio->subtitle = json_encode(['en' => '', 'ar' => '']);
                $portfolio->save();
            }

            return response()->json([
                'status'    => true,
                'portfolio' => ProjectPortfolio::first(),
                'message'   => null,
            ]);
        }

        // POST request - Data update karenge
        elseif ($request->method() === 'POST') {
            $validator = Validator::make($request->all(), [
                'title'    => 'required',
                'toptitle' => 'required',
                'subtitle' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'errors'  => $validator->errors()->all(),
                    'message' => null,
                ], 200);
            }

            $lang = $request->lang ?? 'en';

            $projectRaw = DB::table('project_portfolios')->first();

            if (!$projectRaw) {
                return response()->json([
                    'status'  => false,
                    'errors'  => ['Project not found'],
                    'message' => null,
                ], 404);
            }

            $titleData    = json_decode($projectRaw->title,    true) ?? ['en' => '', 'ar' => ''];
            $topTitleData = json_decode($projectRaw->toptitle, true) ?? ['en' => '', 'ar' => ''];
            $subTitleData = json_decode($projectRaw->subtitle, true) ?? ['en' => '', 'ar' => ''];

            $titleData[$lang]    = $request->title;
            $topTitleData[$lang] = $request->toptitle;
            $subTitleData[$lang] = $request->subtitle;

            DB::table('project_portfolios')
                ->where('id', 1)
                ->update([
                    'title'      => json_encode($titleData),
                    'toptitle'   => json_encode($topTitleData),
                    'subtitle'   => json_encode($subTitleData),
                    'updated_at' => now(),
                ]);

            App::setLocale($lang);

            return response()->json([
                'status'  => true,
                'project' => ProjectPortfolio::first(),
                'message' => 'Project portfolio updated successfully!',
            ]);
        }
    }
}