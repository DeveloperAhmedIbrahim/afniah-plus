<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeAbout;
use App\Models\HomeAboutBullet;
use App\Models\HomeHero;
use App\Models\HomeHeroGallery;
use App\Models\HomeProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class HomeController extends Controller
{
    public function hero(Request $request)
    {
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);
            
            $hero = HomeHero::first();
            
            if($hero === null) {
                $hero = new HomeHero();
                $hero->title = json_encode(['en' => '', 'ar' => '']);
                $hero->subtitle = json_encode(['en' => '', 'ar' => '']);
                $hero->btn_text = json_encode(['en' => '', 'ar' => '']);
                $hero->btn_link = '';
                $hero->save();
            }

            return response()->json([
                'status' => true,
                'hero' => HomeHero::first(),
                'message' => null,
            ]);
        } 
        
        elseif ($request->method() === 'POST') {
            $validator = Validator::make($request->all(), [
                'title' => 'required',
                'subtitle' => 'required',
                'btnText' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()->all(),
                    'message' => null,
                ], 200);
            }

            $lang = $request->lang ?? 'en';
            
            $projectRaw = DB::table('home_heroes')->first();
            
            if (!$projectRaw) {
                return response()->json([
                    'status' => false,
                    'errors' => ['Home hero not found'],
                    'message' => null,
                ], 404);
            }

            $titleData = json_decode($projectRaw->title, true) ?? ['en' => '', 'ar' => ''];
            $subTitleData = json_decode($projectRaw->subtitle, true) ?? ['en' => '', 'ar' => ''];
            $btnTextData = json_decode($projectRaw->btn_text, true) ?? ['en' => '', 'ar' => ''];

            $titleData[$lang] = $request->title;
            $subTitleData[$lang] = $request->subtitle;
            $btnTextData[$lang] = $request->btnText;

            DB::table('home_heroes')
            ->where('id', 1)
            ->update([
                'title' => json_encode($titleData),
                'subtitle' => json_encode($subTitleData),
                'btn_text' => json_encode($btnTextData),
                'updated_at' => now(),
            ]);

            App::setLocale($lang);

            return response()->json([
                'status' => true,
                'project' => HomeHero::first(),
                'message' => 'Home hero updated successfully!',
            ]);
        }
    }

    public function heroGalleryList()
    {
        $gallery = HomeHeroGallery::all();
        return response()->json([
            'status' => true,
            'gallery' => $gallery,
            'message' => NULL
        ]);
    }

    public function heroGalleryInsert(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => NULL,
                'errors' => $validator->errors()->all()
            ], 200);
        }

        $galleryItem = new HomeHeroGallery();

        if($request->hasFile('image')) {
            $uploadPath = public_path("uploads/home/hero/");
            
            if (!File::exists($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true);
            }

            $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension();
            $request->file('image')->move($uploadPath, $imageName);
            
            $galleryItem->image = "uploads/home/hero/" . $imageName;
        }
        
        $galleryItem->save();

        return response()->json([
            'status' => true,
            'message' => 'Gallery item added successfully',
            'item' => $galleryItem,
            'resetForm' => true
        ]);
    }

    public function heroGalleryUpdate(Request $request, $id)
    {
        $galleryItem = HomeHeroGallery::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()->all()
            ], 200);
        }

        if ($request->hasFile('image')) {
            $uploadPath = public_path("uploads/home/hero/");
            
            if (!File::exists($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true);
            }

            $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension();
            $request->file('image')->move($uploadPath, $imageName);
            
            // Purani image ko delete kar sakte hain
            if (!empty($galleryItem->image)) {
                $oldImagePath = public_path("uploads/home/hero/$galleryItem->image");
                if (File::exists($oldImagePath)) {
                    File::delete($oldImagePath);
                }
            }
            
            $galleryItem->image = "uploads/home/hero/" . $imageName;
        }

        $galleryItem->save();

        return response()->json([
            'status' => true,
            'message' => 'Gallery item updated successfully',
            'item' => $galleryItem,
            'resetForm' => true
        ]);
    }

    public function heroGalleryDelete($id)
    {
        $galleryItem = HomeHeroGallery::findOrFail($id);

        if ($galleryItem->image) {
            $oldImagePath = str_replace(url('/'), public_path(), "uploads/home/hero/$galleryItem->image");
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
    
    public function about(Request $request)
    {
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);
            
            $about = HomeAbout::first();
            
            if($about === null) {
                $about = new HomeAbout();
                $about->title = json_encode(['en' => '', 'ar' => '']);
                $about->description = json_encode(['en' => '', 'ar' => '']);
                $about->btn_text = json_encode(['en' => '', 'ar' => '']);
                $about->btn_link = json_encode(['en' => '', 'ar' => '']);
                $about->save();
            }

            return response()->json([
                'status' => true,
                'about' => HomeAbout::first(),
                'message' => null,
            ]);
        } 
        
        elseif ($request->method() === 'POST') {
            $validator = Validator::make($request->all(), [
                'title' => 'required',
                'description' => 'required',
                'btnText' => 'required',
                'btnLink' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()->all(),
                    'message' => null,
                ], 200);
            }

            $lang = $request->lang ?? 'en';
            
            $projectRaw = DB::table('home_abouts')->first();
            
            if (!$projectRaw) {
                return response()->json([
                    'status' => false,
                    'errors' => ['Home about not found'],
                    'message' => null,
                ], 404);
            }

            $titleData = json_decode($projectRaw->title, true) ?? ['en' => '', 'ar' => ''];
            $descriptionData = json_decode($projectRaw->description, true) ?? ['en' => '', 'ar' => ''];
            $btnTextData = json_decode($projectRaw->btn_text, true) ?? ['en' => '', 'ar' => ''];
            $btnLinkData = json_decode($projectRaw->btn_link, true) ?? ['en' => '', 'ar' => ''];

            $titleData[$lang] = $request->title;
            $descriptionData[$lang] = $request->description;
            $btnTextData[$lang] = $request->btnText;
            $btnLinkData[$lang] = $request->btnLink;

            DB::table('home_abouts')
            ->where('id', 1)
            ->update([
                'title' => json_encode($titleData),
                'description' => json_encode($descriptionData),
                'btn_text' => json_encode($btnTextData),
                'btn_link' => json_encode($btnLinkData),
                'updated_at' => now(),
            ]);

            App::setLocale($lang);

            return response()->json([
                'status' => true,
                'about' => HomeAbout::first(),
                'message' => 'Home about updated successfully!',
            ]);
        }
    }

    public function aboutBulletList()
    {
        $bullets = HomeAboutBullet::all();
        return response()->json([
            'status' => true,
            'bullets' => $bullets,
            'message' => NULL
        ]);
    }

    public function aboutBulletInsert(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
            'image' => 'required|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => NULL,
                'errors' => $validator->errors()->all()
            ], 200);
        }

        $titles = ["en" => "", "ar" => ""];
        $descriptions = ["en" => "", "ar" => ""];
        $images = ["en" => "", "ar" => ""];
        
        $titles[$request->lang] = $request->title;
        $descriptions[$request->lang] = $request->description;
        $images[$request->lang] = $request->image;

        $bulletItem = new HomeAboutBullet();

        $bulletItem->title = json_encode($titles);
        $bulletItem->description = json_encode($descriptions);

        if($request->hasFile('image')) {
            $uploadPath = public_path("uploads/home/about/");
            
            if (!File::exists($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true);
            }

            $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension();
            $request->file('image')->move($uploadPath, $imageName);
            
            $images[$request->lang] = "uploads/home/about/" . $imageName;
            $bulletItem->image = json_encode($images);
        }
        
        $bulletItem->save();

        return response()->json([
            'status' => true,
            'message' => 'Bullet item added successfully',
            'bullet' => $bulletItem,
            'resetForm' => true
        ]);
    }

    public function aboutBulletUpdate(Request $request, $id)
    {
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);
            $bulletItem = HomeAboutBullet::find($id);
            return response()->json([
                'status' => true,
                'bullet' => $bulletItem,
                'message' => null,
            ]);
        } 
        
        elseif ($request->method() === 'POST') {
            $validator = Validator::make($request->all(), [
                'title' => 'required',
                'description' => 'required',
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
            $bulletItem = DB::table('home_about_bullets')->where('id', $id)->first();
            
            if (!$bulletItem) {
                return response()->json([
                    'status' => false,
                    'errors' => ['Home about not found'],
                    'message' => null,
                ], 404);
            }

            $titleData = json_decode($bulletItem->title, true) ?? ['en' => '', 'ar' => ''];
            $descriptionData = json_decode($bulletItem->description, true) ?? ['en' => '', 'ar' => ''];
            $imageData = json_decode($bulletItem->image, true) ?? ['en' => '', 'ar' => ''];

            $titleData[$lang] = $request->title;
            $descriptionData[$lang] = $request->description;

            if ($request->hasFile('image')) {
                $uploadPath = public_path("uploads/home/about/");
                
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
                
                $imageData[$lang] = "uploads/home/about/" . $imageName;
            }

            DB::table('home_about_bullets')
            ->where('id', $id)
            ->update([
                'title' => json_encode($titleData),
                'description' => json_encode($descriptionData),
                'image' => json_encode($imageData),
                'updated_at' => now(),
            ]);

            App::setLocale($lang);

            return response()->json([
                'status' => true,
                'bullet' => HomeAboutBullet::find($id),
                'message' => 'Home about bullet updated successfully!',
            ]);
        }        
        
    }

    public function aboutBulletDelete($id)
    {
        $bulletItem = HomeAboutBullet::findOrFail($id);

        if ($bulletItem->image) {
            $oldImagePath = str_replace(url('/'), public_path(), "uploads/home/about/$bulletItem->image");
            if (File::exists($oldImagePath)) {
                File::delete($oldImagePath);
            }
        }

        $bulletItem->delete();

        return response()->json([
            'status' => true,
            'message' => 'Bullet item deleted successfully'
        ]);
    }    

    public function project(Request $request)
    {
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);
            
            $project = HomeProject::first();
            
            if($project === null) {
                $project = new HomeProject();
                $project->title = json_encode(['en' => '', 'ar' => '']);
                $project->btn_text = json_encode(['en' => '', 'ar' => '']);
                $project->btn_link = json_encode(['en' => '', 'ar' => '']);
                $project->save();
            }

            return response()->json([
                'status' => true,
                'project' => HomeProject::first(),
                'message' => null,
            ]);
        } 
        
        elseif ($request->method() === 'POST') {
            $validator = Validator::make($request->all(), [
                'title' => 'required',
                'btnText' => 'required',
                'btnLink' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()->all(),
                    'message' => null,
                ], 200);
            }

            $lang = $request->lang ?? 'en';
            
            $projectRaw = DB::table('home_projects')->first();
            
            if (!$projectRaw) {
                return response()->json([
                    'status' => false,
                    'errors' => ['Home project not found'],
                    'message' => null,
                ], 404);
            }

            $titleData = json_decode($projectRaw->title, true) ?? ['en' => '', 'ar' => ''];
            $btnTextData = json_decode($projectRaw->btn_text, true) ?? ['en' => '', 'ar' => ''];
            $btnLinkData = json_decode($projectRaw->btn_link, true) ?? ['en' => '', 'ar' => ''];

            $titleData[$lang] = $request->title;
            $btnTextData[$lang] = $request->btnText;
            $btnLinkData[$lang] = $request->btnLink;

            DB::table('home_projects')
            ->where('id', 1)
            ->update([
                'title' => json_encode($titleData),
                'btn_text' => json_encode($btnTextData),
                'btn_link' => json_encode($btnLinkData),
                'updated_at' => now(),
            ]);

            App::setLocale($lang);

            return response()->json([
                'status' => true,
                'project' => HomeProject::first(),
                'message' => 'Home project updated successfully!',
            ]);
        }
    }    
}
