<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceHero;
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
}
