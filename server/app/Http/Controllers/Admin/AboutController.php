<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutHero;
use App\Models\AboutTeam;
use App\Models\AboutTeamGallery;
use App\Models\AboutVision;
use App\Models\AboutWeAre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class AboutController extends Controller
{
    public function hero(Request $request)
    {
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);
            
            $hero = AboutHero::first();
            
            if($hero === null) {
                $hero = new AboutHero();
                $hero->title = json_encode(['en' => '', 'ar' => '']);
                $hero->subtitle = json_encode(['en' => '', 'ar' => '']);
                $hero->image = '';
                $hero->save();
            }

            return response()->json([
                'status' => true,
                'hero' => AboutHero::first(),
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
            $aboutRaw = DB::table('about_heroes')->first();

            if (!$aboutRaw) {
                return response()->json([
                    'status' => false,
                    'errors' => ['About not found'],
                    'message' => null,
                ], 404);
            }

            $titleData = json_decode($aboutRaw->title, true) ?? ['en' => '', 'ar' => ''];
            $subTitleData = json_decode($aboutRaw->subtitle, true) ?? ['en' => '', 'ar' => ''];
            $imageData = json_decode($aboutRaw->image, true) ?? ['en' => '', 'ar' => ''];

            $titleData[$lang] = $request->title;
            $subTitleData[$lang] = $request->subtitle;

            // Image upload handling
            if ($request->hasFile('image')) {
                $uploadPath = public_path("uploads/abouts/hero/");
                
                if (!File::exists($uploadPath)) {
                    File::makeDirectory($uploadPath, 0755, true);
                }

                $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension();
                $request->file('image')->move($uploadPath, $imageName);
                
                // Purani image ko delete kar sakte hain
                if (!empty($imageData[$lang])) {
                    $oldImagePath = public_path($imageData[$lang]);
                    if (File::exists($oldImagePath)) {
                        File::delete($oldImagePath);
                    }
                }
                
                $imageData[$lang] = "uploads/abouts/hero/" . $imageName;
            }

            DB::table('about_heroes')
            ->where('id', 1)
            ->update([
                'title' => json_encode($titleData),
                'subtitle' => json_encode($subTitleData),
                'image' => json_encode($imageData),
                'updated_at' => now(),
            ]);

            App::setLocale($lang);

            return response()->json([
                'status' => true,
                'about' => AboutHero::first(),
                'message' => 'About hero updated successfully!',
            ]);
        }
    }

    public function whoWeAre(Request $request)
    {
        // Implementation for whoWeAre method
        if ($request->method() === 'GET') {
            // Handle GET request
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);
            
            $whoWeAre = AboutWeAre::first();

            if($whoWeAre === null) {
                $whoWeAre = new AboutWeAre();
                $whoWeAre->title = json_encode(['en' => '', 'ar' => '']);
                $whoWeAre->description = json_encode(['en' => '', 'ar' => '']);
                $whoWeAre->image = '';
                $whoWeAre->save();
            }
            return response()->json([
                'status' => true,
                'whoWeAre' => $whoWeAre,
                'message' => null,
            ]);
        } elseif ($request->method() === 'POST') {
            // Handle POST request
            $validator = Validator::make($request->all(), [
                'title' => 'required',
                'description' => 'required',
                'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()->all(),
                    'message' => null,
                ], 200);
            }
            
            $lang = $request->lang ?? 'en';
            $whoWeAre = DB::table('about_we_ares')->first();

            if (!$whoWeAre) {
                return response()->json([
                    'status' => false,
                    'errors' => ['About not found'],
                    'message' => null,
                ], 404);
            }

            $titleData = json_decode($whoWeAre->title, true) ?? ['en' => '', 'ar' => ''];
            $descriptionData = json_decode($whoWeAre->description, true) ?? ['en' => '', 'ar' => ''];
            $imageData = json_decode($whoWeAre->image, true) ?? ['en' => '', 'ar' => ''];

            $titleData[$lang] = $request->title;
            $descriptionData[$lang] = $request->description;

            // Image upload handling
            if ($request->hasFile('image')) {
                $uploadPath = public_path("uploads/abouts/who-we-are/");
                
                if (!File::exists($uploadPath)) {
                    File::makeDirectory($uploadPath, 0755, true);
                }

                $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension();
                $request->file('image')->move($uploadPath, $imageName);
                
                // Purani image ko delete kar sakte hain
                if (!empty($imageData[$lang])) {
                    $oldImagePath = public_path($imageData[$lang]);
                    if (File::exists($oldImagePath)) {
                        File::delete($oldImagePath);
                    }
                }

                $imageData[$lang] = "uploads/abouts/who-we-are/" . $imageName;
            }

            DB::table('about_we_ares')
            ->where('id', 1)
            ->update([
                'title' => json_encode($titleData),
                'description' => json_encode($descriptionData),
                'image' => json_encode($imageData),
                'updated_at' => now(),
            ]);

            App::setLocale($lang);

            return response()->json([
                'status' => true,
                'whoWeAre' => AboutWeAre::first(),
                'message' => 'Who We Are section updated successfully!',
            ]);
        }
    }

    public function vision(Request $request)
    {
        // Implementation for vision method
        if ($request->method() === 'GET') {
            // Handle GET request
            $vision = AboutVision::first();
            return response()->json([
                'status' => true,
                'vision' => $vision,
                'message' => null,
            ]);
        } elseif ($request->method() === 'POST') {
            // Handle POST request
            $validator = Validator::make($request->all(), [
                'title' => 'required',
                'description' => 'required',
                'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]); 
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()->all(),
                    'message' => null,
                ], 200);
            }
            $vision = AboutVision::first();
            if (!$vision) {
                $vision = new AboutVision();
                $vision->created_at = now();
            }
            $vision->title = $request->title;
            $vision->description = $request->description;
            if ($request->hasFile('image')) {
                $uploadPath = public_path("uploads/abouts/vision/");
                if (!File::exists($uploadPath)) {
                    File::makeDirectory($uploadPath, 0755, true);
                }
                $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension();
                $request->file('image')->move($uploadPath, $imageName);
                // Delete old image if exists
                if ($vision->image) {
                    $oldImagePath = public_path($vision->image);
                    if (File::exists($oldImagePath)) {
                        File::delete($oldImagePath);
                    }
                }
                $vision->image = "uploads/abouts/vision/" . $imageName;
            }
            $vision->updated_at = now();
            $vision->save();
            return response()->json([
                'status' => true,               
                'vision' => $vision,
                'message' => 'Vision section updated successfully!',
            ]); 
        }
    }

    public function team(Request $request)
    {
        // Implementation for team method
        if ($request->method() === 'GET') {
            // Handle GET request
            $team = AboutTeam::first();
            return response()->json([
                'status' => true,
                'team' => $team,
                'message' => null,
            ]);
        } elseif ($request->method() === 'POST') {
            // Handle POST request
            $validator = Validator::make($request->all(), [
                'title' => 'required',
                'description' => 'required',
            ]); 

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()->all(),
                    'message' => null,
                ], 200);
            }
            $team = AboutTeam::first();
            if (!$team) {
                $team = new AboutTeam();
                $team->created_at = now();
            }
            $team->title = $request->title;
            $team->description = $request->description;
            $team->updated_at = now();  
            $team->save();
            return response()->json([
                'status' => true,               
                'team' => $team,
                'message' => 'Team section updated successfully!',
            ]);
        }
    }

    public function teamGalleryList()
    {
        $gallery = AboutTeamGallery::all();
        return response()->json([
            'status' => true,
            'gallery' => $gallery,
            'message' => NULL
        ]);
    }

    public function teamGalleryInsert(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'designation' => 'required',
            'image' => 'required|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => NULL,
                'errors' => $validator->errors()->all()
            ], 200);
        }

        $names = ["en" => "", "ar" => ""];
        $designations = ["en" => "", "ar" => ""];
        $images = ["en" => "", "ar" => ""];
        
        $names[$request->lang] = $request->names;
        $designations[$request->lang] = $request->designation;
        $images[$request->lang] = $request->image;

        $galleryItem = new AboutTeamGallery();

        $galleryItem->name = json_encode($names);
        $galleryItem->designation = json_encode($designations);

        if($request->hasFile('image')) {
            $uploadPath = public_path("uploads/abouts/team/");
            
            if (!File::exists($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true);
            }

            $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension();
            $request->file('image')->move($uploadPath, $imageName);

            $images[$request->lang] = "uploads/abouts/team/" . $imageName;
            $galleryItem->image = json_encode($images);
        }

        $galleryItem->save();

        return response()->json([
            'status' => true,
            'message' => 'Gallery item added successfully',
            'gallery' => $galleryItem,
            'resetForm' => true
        ]);
    }

    public function teamGalleryUpdate(Request $request, $id)
    {
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);
            $galleryItem = AboutTeamGallery::find($id);
            return response()->json([
                'status' => true,
                'gallery' => $galleryItem,
                'message' => null,
            ]);
        } 
        
        elseif ($request->method() === 'POST') {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'designation' => 'required',
                'image' => 'required|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()->all(),
                    'message' => null,
                ], 200);
            }

            $lang = $request->lang ?? 'en';
            $galleryItem = DB::table('about_team_gallery')->where('id', $id)->first();

            if (!$galleryItem) {
                return response()->json([
                    'status' => false,
                    'errors' => ['Gallery item not found'],
                    'message' => null,
                ], 404);
            }

            $nameData = json_decode($galleryItem->name, true) ?? ['en' => '', 'ar' => ''];
            $designationData = json_decode($galleryItem->designation, true) ?? ['en' => '', 'ar' => ''];
            $imageData = json_decode($galleryItem->image, true) ?? ['en' => '', 'ar' => ''];

            $nameData[$lang] = $request->name;
            $designationData[$lang] = $request->designation;

            if ($request->hasFile('image')) {
                $uploadPath = public_path("uploads/abouts/team/");
                
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

                $imageData[$lang] = "uploads/abouts/team/" . $imageName;
            }

            DB::table('about_team_gallery')
            ->where('id', $id)
            ->update([
                'name' => json_encode($nameData),
                'designation' => json_encode($designationData),
                'image' => json_encode($imageData),
                'updated_at' => now(),
            ]);

            App::setLocale($lang);

            return response()->json([
                'status' => true,
                'gallery' => AboutTeamGallery::find($id),
                'message' => 'Gallery item updated successfully!',
            ]);
        }        
        
    }

    public function teamGalleryDelete($id)
    {
        $galleryItem = AboutTeamGallery::findOrFail($id);

        if ($galleryItem->image) {
            $oldImagePath = str_replace(url('/'), public_path(), "uploads/abouts/team/$galleryItem->image");
            if (File::exists($oldImagePath)) {
                File::delete($oldImagePath);
            }
        }

        $galleryItem->delete();

        return response()->json([
            'status' => true,
            'message' => 'Gallery item deleted successfully'
        ]);
    }    
}
