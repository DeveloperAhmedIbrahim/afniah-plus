<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ServiceHero;
use App\Models\ServiceSection01;
use App\Models\ServiceSection01Bullet;
use App\Models\ServiceSection02;
use App\Models\ServiceSection02Bullet;
use App\Models\ServiceSection03;
use App\Models\ServiceSection03Bullet;
use App\Models\ServiceWhatWeOffer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
    public function hero(Request $request)
    {
        // GET request - Data fetch karenge
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);
            
            // Model apne getters ke through data return karega
            $hero = ServiceHero::first();
            
            if($hero === null) {
                $hero = new ServiceHero();
                $hero->title = json_encode(['en' => '', 'ar' => '']);
                $hero->subtitle = json_encode(['en' => '', 'ar' => '']);
                $hero->image = '';
                $hero->save();
            }

            return response()->json([
                'status' => true,
                'hero' => ServiceHero::first(),
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
            $serviceRaw = DB::table('service_heroes')->first();
            
            if (!$serviceRaw) {
                return response()->json([
                    'status' => false,
                    'errors' => ['Service not found'],
                    'message' => null,
                ], 404);
            }

            // Raw JSON columns ko decode karenge
            $titleData = json_decode($serviceRaw->title, true) ?? ['en' => '', 'ar' => ''];
            $subTitleData = json_decode($serviceRaw->subtitle, true) ?? ['en' => '', 'ar' => ''];
            $imageData = json_decode($serviceRaw->image, true) ?? ['en' => '', 'ar' => ''];

            // Current language ka data update karenge
            $titleData[$lang] = $request->title;
            $subTitleData[$lang] = $request->subtitle;

            // Image upload handling
            if ($request->hasFile('image')) {
                $uploadPath = public_path("uploads/services/hero/");

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

                $imageData[$lang] = "uploads/services/hero/" . $imageName;
            }

            // Direct database update using Query Builder
            DB::table('service_heroes')
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
                'hero' => ServiceHero::first(),
                'message' => 'Service hero updated successfully!',
            ]);
        }
    }

    public function whatWeOffer(Request $request)
    {
        // GET request - Data fetch karenge
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);
            
            // Model apne getters ke through data return karega
            $whatWeOffer = ServiceWhatWeOffer::first();

            if($whatWeOffer === null) {
                $whatWeOffer = new ServiceWhatWeOffer();
                $whatWeOffer->title = json_encode(['en' => '', 'ar' => '']);
                $whatWeOffer->toptitle = json_encode(['en' => '', 'ar' => '']);
                $whatWeOffer->subtitle = json_encode(['en' => '', 'ar' => '']);
                $whatWeOffer->save();
            }

            return response()->json([
                'status' => true,
                'whatWeOffer' => $whatWeOffer,
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
            $whatWeOfferRaw = DB::table('service_what_we_offers')->first();

            if (!$whatWeOfferRaw) {
                return response()->json([
                    'status' => false,
                    'errors' => ['What We Offer not found'],
                    'message' => null,
                ], 404);
            }

            // Raw JSON columns ko decode karenge
            $titleData = json_decode($whatWeOfferRaw->title, true) ?? ['en' => '', 'ar' => ''];
            $topTitleData = json_decode($whatWeOfferRaw->toptitle, true) ?? ['en' => '', 'ar' => ''];
            $subTitleData = json_decode($whatWeOfferRaw->subtitle, true) ?? ['en' => '', 'ar' => ''];

            // Current language ka data update karenge
            $titleData[$lang] = $request->title;
            $topTitleData[$lang] = $request->toptitle;
            $subTitleData[$lang] = $request->subtitle;


            // Direct database update using Query Builder
            DB::table('service_what_we_offers')
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
                'whatWeOffer' => ServiceWhatWeOffer::first(),
                'message' => 'What We Offer updated successfully!',
                // 'navigateTo' => "/admin/project/portfolio?lang=en",
            ]);
        }
    }    

    public function list(Request $request)
    {
        App::setLocale('en');
        $services = Service::orderBy('id', 'DESC')->get();
        return response()->json([
            'status' => true,
            'services' => $services,
            'message' => null
        ]);
    }

    public function insert(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title'               => 'required|string|max:255',
            'description'   => 'required|string|max:500',
            'featured_image'      => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
            'banner_image'        => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,webp|max:10240',
        ]);

        if ($validator->fails()) {
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
        $description = [$lang => $request->description, $otherLang => ''];

        $featured_image = ['en' => '', 'ar' => ''];
        $banner_image = ['en' => '', 'ar' => ''];

        $service = new Service();
        $service->title = json_encode($title);
        $service->description = json_encode($description);
        $service->featured_image = json_encode($featured_image);
        $service->banner_image = json_encode($banner_image);
        $service->save();

        // Images upload
        $uploadPath = public_path("uploads/services/{$service->id}/");
        if (!File::exists($uploadPath)) {
            File::makeDirectory($uploadPath, 0755, true);
        }

        // Featured Image
        if ($request->hasFile('featured_image')) {
            $file = $request->file('featured_image');
            $fileName = 'featured_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadPath, $fileName);
            $featured_image[$lang] = "uploads/services/{$service->id}/" . $fileName;
        }

        // Banner Image
        if ($request->hasFile('banner_image')) {
            $file = $request->file('banner_image');
            $fileName = 'banner_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadPath, $fileName);
            $banner_image[$lang] = "uploads/services/{$service->id}/" . $fileName;
        }

        // Update images in DB
        $service->featured_image = json_encode($featured_image);
        $service->banner_image = json_encode($banner_image);
        $service->save();

        return response()->json([
            'status' => true,
            'service' => $service,
            'message' => 'Service inserted successfully!',
            'navigateTo' => "/admin/service/update/{$service->id}?lang={$lang}",
            'resetForm' => true,
        ]);
    }

    public function update(Request $request, $id)
    {
        // GET request - Data fetch
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);

            $service = Service::findOrFail($id);

            return response()->json([
                'status' => true,
                'service' => $service,
                'message' => null,
            ]);
        }

        // POST request - Update
        elseif ($request->method() === 'POST') {
            $validator = Validator::make($request->all(), [
                'title'               => 'required|string|max:255',
                'description'   => 'required|string|max:500',
                'featured_image'      => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
                'banner_image'        => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,webp|max:10240',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()->all(),
                    'message' => null,
                ], 200);
            }

            $lang = $request->lang ?? 'en';

            // Raw data fetch
            $serviceRaw = DB::table('services')->where('id', $id)->first();

            if (!$serviceRaw) {
                return response()->json([
                    'status' => false,
                    'errors' => ['Service not found'],
                    'message' => null,
                ], 404);
            }

            // Decode existing JSON
            $titleData             = json_decode($serviceRaw->title, true) ?? ['en' => '', 'ar' => ''];
            $descriptionData       = json_decode($serviceRaw->description, true) ?? ['en' => '', 'ar' => ''];
            $featuredImageData     = json_decode($serviceRaw->featured_image, true) ?? ['en' => '', 'ar' => ''];
            $bannerImageData       = json_decode($serviceRaw->banner_image, true) ?? ['en' => '', 'ar' => ''];

            // Update current language data
            $titleData[$lang]            = $request->title;
            $descriptionData[$lang]      = $request->description;

            // Upload path
            $uploadPath = public_path("uploads/services/{$id}/");
            if (!File::exists($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true);
            }

            // Featured Image update
            if ($request->hasFile('featured_image')) {
                $file = $request->file('featured_image');
                $fileName = 'featured_' . time() . '.' . $file->getClientOriginalExtension();
                $file->move($uploadPath, $fileName);

                // Delete old if exists
                if (!empty($featuredImageData[$lang])) {
                    $oldPath = public_path(str_replace(url('/'), '', $featuredImageData[$lang]));
                    if (File::exists($oldPath)) File::delete($oldPath);
                }

                $featuredImageData[$lang] = "uploads/services/{$id}/" . $fileName;
            }

            // Banner Image update
            if ($request->hasFile('banner_image')) {
                $file = $request->file('banner_image');
                $fileName = 'banner_' . time() . '.' . $file->getClientOriginalExtension();
                $file->move($uploadPath, $fileName);

                if (!empty($bannerImageData[$lang])) {
                    $oldPath = public_path(str_replace(url('/'), '', $bannerImageData[$lang]));
                    if (File::exists($oldPath)) File::delete($oldPath);
                }

                $bannerImageData[$lang] = "uploads/services/{$id}/" . $fileName;
            }

            // Update in DB
            DB::table('services')
                ->where('id', $id)
                ->update([
                    'title'             => json_encode($titleData),
                    'description'       => json_encode($descriptionData),
                    'featured_image'    => json_encode($featuredImageData),
                    'banner_image'      => json_encode($bannerImageData),
                    'updated_at'        => now(),
                ]);

            // Fresh data with locale
            App::setLocale($lang);
            $updatedService = Service::find($id);

            return response()->json([
                'status' => true,
                'service' => $updatedService,
                'message' => 'Service updated successfully!',
            ]);
        }
    }

    public function delete($id)
    {
        $service = Service::findOrFail($id);

        // Delete images folder
        $uploadPath = public_path("uploads/services/{$id}/");
        if (File::exists($uploadPath)) {
            File::deleteDirectory($uploadPath);
        }

        $service->delete();

        return response()->json([
            'status' => true,
            'message' => 'Service deleted successfully!'
        ]);
    }   
    
    public function section01(Request $request, $id)
    {
        // Implementation for section01 method
        if ($request->method() === 'GET') {
            // Handle GET request
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);

            $section01 = ServiceSection01::whereServiceId($id)->first();

            if($section01 === null) {
                $section01 = new ServiceSection01();
                $section01->title = json_encode(['en' => '', 'ar' => '']);
                $section01->description = json_encode(['en' => '', 'ar' => '']);
                $section01->image = json_encode(['en' => '', 'ar' => '']);
                $section01->stats_title = json_encode(['en' => '', 'ar' => '']);
                $section01->stats_count = json_encode(['en' => '', 'ar' => '']);
                $section01->stats_icon = '';
                $section01->service_id = $id;
                $section01->save();
            }
            return response()->json([
                'status' => true,
                'section01' => $section01,
                'message' => null,
            ]);
        } elseif ($request->method() === 'POST') {
            // Handle POST request
            $validator = Validator::make($request->all(), [
                'title' => 'required',
                'description' => 'required',
                'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'statsTitle' => 'required',
                'statsCount' => 'required|integer',
                'statsIcon' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()->all(),
                    'message' => null,
                ], 200);
            }
            
            $lang = $request->lang ?? 'en';
            $section01 = DB::table('service_section01s')->where('service_id', $id)->first();

            if (!$section01) {
                return response()->json([
                    'status' => false,
                    'errors' => ['Section 01 not found'],
                    'message' => null,
                ], 404);
            }

            $titleData = json_decode($section01->title, true) ?? ['en' => '', 'ar' => ''];
            $descriptionData = json_decode($section01->description, true) ?? ['en' => '', 'ar' => ''];
            $imageData = json_decode($section01->image, true) ?? ['en' => '', 'ar' => ''];
            $statsTitleData = json_decode($section01->stats_title, true) ?? ['en' => '', 'ar' => ''];
            $statsCountData = json_decode($section01->stats_count, true) ?? ['en' => '', 'ar' => ''];
            $statsIconData = json_decode($section01->stats_icon, true) ?? ['en' => '', 'ar' => ''];

            $titleData[$lang] = $request->title;
            $descriptionData[$lang] = $request->description;
            $statsTitleData[$lang] = $request->statsTitle;
            $statsCountData[$lang] = $request->statsCount;
            $statsIconData[$lang] = $request->statsIcon;

            // Image upload handling
            if ($request->hasFile('image')) {
                $uploadPath = public_path("uploads/services/{$id}/");
                
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

                $imageData[$lang] = "uploads/services/{$id}/" . $imageName;
            }

            DB::table('service_section01s')
            ->where('service_id', $id)
            ->update([
                'title' => json_encode($titleData),
                'description' => json_encode($descriptionData),
                'image' => json_encode($imageData),
                'stats_title' => json_encode($statsTitleData),
                'stats_count' => json_encode($statsCountData),
                'stats_icon' => json_encode($statsIconData),
                'updated_at' => now(),
            ]);

            App::setLocale($lang);

            return response()->json([
                'status' => true,
                'section01' => ServiceSection01::whereServiceId($id)->first(),
                'message' => 'Service Section 01 updated successfully!',
            ]);
        }
    }
    
    public function section01BulletList($id)
    {
        $bullets = ServiceSection01Bullet::where('service_id', $id)->get();
        return response()->json([
            'status' => true,
            'bullets' => $bullets,
            'message' => NULL
        ]);
    }

    public function section01BulletInsert(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'bulletText' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => NULL,
                'errors' => $validator->errors()->all()
            ], 200);
        }

        $bulletTexts = ["en" => "", "ar" => ""];
        
        $bulletTexts[$request->lang ?? 'en'] = $request->bulletText;
        
        $bulletItem = new ServiceSection01Bullet();
        $bulletItem->bullet_text = json_encode($bulletTexts);
        $bulletItem->service_id = $id;
        $bulletItem->save();

        return response()->json([
            'status' => true,
            'message' => 'Bullet item added successfully',
            'bullet' => $bulletItem,
            'resetForm' => true
        ]);
    }

    public function section01BulletUpdate(Request $request, $id, $bulletId)
    {
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);
            $bulletItem = ServiceSection01Bullet::find($bulletId);
            return response()->json([
                'status' => true,
                'bullet' => $bulletItem,
                'message' => null,
            ]);
        } 
        
        elseif ($request->method() === 'POST') {
            $validator = Validator::make($request->all(), [
                'bulletText' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()->all(),
                    'message' => null,
                ], 200);
            }

            $lang = $request->lang ?? 'en';
            $bulletItem = DB::table('service_section01_bullets')->where('id', $bulletId)->first();
            
            if (!$bulletItem) {
                return response()->json([
                    'status' => false,
                    'errors' => ['Service section 01 bullet not found'],
                    'message' => null,
                ], 404);
            }

            $bulletTextData = json_decode($bulletItem->bullet_text, true) ?? ['en' => '', 'ar' => ''];
            $bulletTextData[$lang] = $request->bulletText;
        

            DB::table('service_section01_bullets')
            ->where('id', $bulletId)
            ->update([
                'bullet_text' => json_encode($bulletTextData),
                'updated_at' => now(),
            ]);

            App::setLocale($lang);

            return response()->json([
                'status' => true,
                'bullet' => ServiceSection01Bullet::find($id),
                'message' => 'Service section 01 bullet updated successfully!',
            ]);
        }        
        
    }

    public function section01BulletDelete($id, $bulletId)
    {
        $bulletItem = ServiceSection01Bullet::findOrFail($bulletId);
        $bulletItem->delete();

        return response()->json([
            'status' => true,
            'message' => 'Bullet item deleted successfully'
        ]);
    }

    public function section02(Request $request, $id)
    {
        // Implementation for section01 method
        if ($request->method() === 'GET') {
            // Handle GET request
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);

            $section02 = ServiceSection02::whereServiceId($id)->first();

            if($section02 === null) {
                $section02 = new ServiceSection02();
                $section02->title = json_encode(['en' => '', 'ar' => '']);
                $section02->subtitle = json_encode(['en' => '', 'ar' => '']);
                $section02->service_id = $id;
                $section02->save();
            }
            return response()->json([
                'status' => true,
                'section02' => $section02,
                'message' => null,
            ]);
        } elseif ($request->method() === 'POST') {
            // Handle POST request
            $validator = Validator::make($request->all(), [
                'title' => 'required',
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
            $section02 = DB::table('service_section02s')->where('service_id', $id)->first();

            if (!$section02) {
                return response()->json([
                    'status' => false,
                    'errors' => ['Section 02 not found'],
                    'message' => null,
                ], 404);
            }

            $titleData = json_decode($section02->title, true) ?? ['en' => '', 'ar' => ''];
            $subtitleData = json_decode($section02->subtitle, true) ?? ['en' => '', 'ar' => ''];

            $titleData[$lang] = $request->title;
            $subtitleData[$lang] = $request->subtitle;


            DB::table('service_section02s')
            ->where('service_id', $id)
            ->update([
                'title' => json_encode($titleData),
                'subtitle' => json_encode($subtitleData),
                'updated_at' => now(),
            ]);

            App::setLocale($lang);

            return response()->json([
                'status' => true,
                'section02' => ServiceSection02::whereServiceId($id)->first(),
                'message' => 'Service Section 02 updated successfully!',
            ]);
        }
    }

    public function section02BulletList($id)
    {
        $bullets = ServiceSection02Bullet::where('service_id', $id)->get();
        return response()->json([
            'status' => true,
            'bullets' => $bullets,
            'message' => NULL
        ]);
    }

    public function section02BulletInsert(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'icon' => 'required',
            'description' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => NULL,
                'errors' => $validator->errors()->all()
            ], 200);
        }

        $titles = ["en" => "", "ar" => ""];
        $icons = ["en" => "", "ar" => ""];
        $descriptions = ["en" => "", "ar" => ""];
        
        $titles[$request->lang ?? 'en'] = $request->title;
        $icons[$request->lang ?? 'en'] = $request->icon;
        $descriptions[$request->lang ?? 'en'] = $request->description;
        
        $bulletItem = new ServiceSection02Bullet();
        $bulletItem->title = json_encode($titles);
        $bulletItem->icon = json_encode($icons);
        $bulletItem->description = json_encode($descriptions);
        $bulletItem->service_id = $id;
        $bulletItem->save();

        return response()->json([
            'status' => true,
            'message' => 'Bullet item added successfully',
            'bullet' => $bulletItem,
            'resetForm' => true
        ]);
    }

    public function section02BulletUpdate(Request $request, $id, $bulletId)
    {
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);
            $bulletItem = ServiceSection02Bullet::find($bulletId);
            return response()->json([
                'status' => true,
                'bullet' => $bulletItem,
                'message' => null,
            ]);
        } 
        
        elseif ($request->method() === 'POST') {
            $validator = Validator::make($request->all(), [
                'title' => 'required',
                'icon' => 'required',
                'description' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()->all(),
                    'message' => null,
                ], 200);
            }

            $lang = $request->lang ?? 'en';
            $bulletItem = DB::table('service_section02_bullets')->where('id', $bulletId)->first();
            
            if (!$bulletItem) {
                return response()->json([
                    'status' => false,
                    'errors' => ['Service section 02 bullet not found'],
                    'message' => null,
                ], 404);
            }

            $titleData = json_decode($bulletItem->title, true) ?? ['en' => '', 'ar' => ''];
            $iconData = json_decode($bulletItem->icon, true) ?? ['en' => '', 'ar' => ''];
            $descriptionData = json_decode($bulletItem->description, true) ?? ['en' => '', 'ar' => ''];

            $titleData[$lang] = $request->title;
            $iconData[$lang] = $request->icon;
            $descriptionData[$lang] = $request->description;
        

            DB::table('service_section02_bullets')
            ->where('id', $bulletId)
            ->update([
                'title' => json_encode($titleData),
                'icon' => json_encode($iconData),
                'description' => json_encode($descriptionData),
                'updated_at' => now(),
            ]);

            App::setLocale($lang);

            return response()->json([
                'status' => true,
                'bullet' => ServiceSection02Bullet::find($id),
                'message' => 'Service section 02 bullet updated successfully!',
            ]);
        }        
        
    }

    public function section02BulletDelete($id, $bulletId)
    {
        $bulletItem = ServiceSection02Bullet::findOrFail($bulletId);
        $bulletItem->delete();

        return response()->json([
            'status' => true,
            'message' => 'Bullet item deleted successfully'
        ]);
    }    

    public function section03(Request $request, $id)
    {
        // Implementation for section01 method
        if ($request->method() === 'GET') {
            // Handle GET request
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);

            $section03 = ServiceSection03::whereServiceId($id)->first();

            if($section03 === null) {
                $section03 = new ServiceSection03();
                $section03->title = json_encode(['en' => '', 'ar' => '']);
                $section03->image = json_encode(['en' => '', 'ar' => '']);
                $section03->service_id = $id;
                $section03->save();
            }
            return response()->json([
                'status' => true,
                'section03' => $section03,
                'message' => null,
            ]);
        } elseif ($request->method() === 'POST') {
            // Handle POST request
            $validator = Validator::make($request->all(), [
                'title' => 'required',
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
            $section03 = DB::table('service_section03s')->where('service_id', $id)->first();

            if (!$section03) {
                return response()->json([
                    'status' => false,
                    'errors' => ['Section 03 not found'],
                    'message' => null,
                ], 404);
            }

            $titleData = json_decode($section03->title, true) ?? ['en' => '', 'ar' => ''];
            $imageData = json_decode($section03->image, true) ?? ['en' => '', 'ar' => ''];

            $titleData[$lang] = $request->title;

            // Image upload handling
            if ($request->hasFile('image')) {
                $uploadPath = public_path("uploads/services/{$id}/");
                
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

                $imageData[$lang] = "uploads/services/{$id}/" . $imageName;
            }

            DB::table('service_section03s')
            ->where('service_id', $id)
            ->update([
                'title' => json_encode($titleData),
                'image' => json_encode($imageData),
                'updated_at' => now(),
            ]);

            App::setLocale($lang);

            return response()->json([
                'status' => true,
                'section03' => ServiceSection03::whereServiceId($id)->first(),
                'message' => 'Service Section 03 updated successfully!',
            ]);
        }
    }
    
    public function section03BulletList($id)
    {
        $bullets = ServiceSection03Bullet::where('service_id', $id)->get();
        return response()->json([
            'status' => true,
            'bullets' => $bullets,
            'message' => NULL
        ]);
    }

    public function section03BulletInsert(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
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
        
        $titles[$request->lang ?? 'en'] = $request->title;
        $descriptions[$request->lang ?? 'en'] = $request->description;
        
        $bulletItem = new ServiceSection03Bullet();
        $bulletItem->title = json_encode($titles);
        $bulletItem->description = json_encode($descriptions);
        $bulletItem->service_id = $id;
        $bulletItem->save();

        return response()->json([
            'status' => true,
            'message' => 'Bullet item added successfully',
            'bullet' => $bulletItem,
            'resetForm' => true
        ]);
    }

    public function section03BulletUpdate(Request $request, $id, $bulletId)
    {
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);
            $bulletItem = ServiceSection03Bullet::find($bulletId);
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
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()->all(),
                    'message' => null,
                ], 200);
            }

            $lang = $request->lang ?? 'en';
            $bulletItem = DB::table('service_section03_bullets')->where('id', $bulletId)->first();
            
            if (!$bulletItem) {
                return response()->json([
                    'status' => false,
                    'errors' => ['Service section 03 bullet not found'],
                    'message' => null,
                ], 404);
            }

            $titleData = json_decode($bulletItem->title, true) ?? ['en' => '', 'ar' => ''];
            $descriptionData = json_decode($bulletItem->description, true) ?? ['en' => '', 'ar' => ''];
            $titleData[$lang] = $request->title;
            $descriptionData[$lang] = $request->description;
        

            DB::table('service_section03_bullets')
            ->where('id', $bulletId)
            ->update([
                'title' => json_encode($titleData),
                'description' => json_encode($descriptionData),
                'updated_at' => now(),
            ]);

            App::setLocale($lang);

            return response()->json([
                'status' => true,
                'bullet' => ServiceSection03Bullet::find($id),
                'message' => 'Service section 03 bullet updated successfully!',
            ]);
        }        
        
    }

    public function section03BulletDelete($id, $bulletId)
    {
        $bulletItem = ServiceSection03Bullet::findOrFail($bulletId);
        $bulletItem->delete();

        return response()->json([
            'status' => true,
            'message' => 'Bullet item deleted successfully'
        ]);
    }    
}
