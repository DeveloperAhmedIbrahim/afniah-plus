<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SocialDetail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OthersController extends Controller
{
    public function socialDetails(Request $request)
    {
        // GET request - Data fetch karenge
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);
            
            // Model apne getters ke through data return karega
            $socialDetails = SocialDetail::first();

            if($socialDetails === null) {
                $socialDetails = new SocialDetail();
                $socialDetails->tagline = json_encode(['en' => '', 'ar' => '']);
                $socialDetails->copyright_credits = json_encode(['en' => '', 'ar' => '']);
                $socialDetails->address = '';
                $socialDetails->email = '';
                $socialDetails->contact = '';
                $socialDetails->facebook = '';
                $socialDetails->twitter = '';
                $socialDetails->instagram = '';
                $socialDetails->linkedin = '';
                $socialDetails->save();
            }

            return response()->json([
                'status' => true,
                'socialDetails' => $socialDetails,
                'message' => null,
            ]);
        } 
        
        // POST request - Data update karenge
        elseif ($request->method() === 'POST') {
            $validator = Validator::make($request->all(), [
                'tagline' => 'required',
                'copyrightCredits' => 'required',
                'address' => 'required',
                'email' => 'required',
                'contact' => 'required',
                'facebook' => 'required',
                'twitter' => 'required',
                'instagram' => 'required',
                'linkedin' => 'required',                
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
            $sicialDetailsRaw = DB::table('social_details')->first();

            if (!$sicialDetailsRaw) {
                return response()->json([
                    'status' => false,
                    'errors' => ['Socials details not found'],
                    'message' => null,
                ], 404);
            }

            // Raw JSON columns ko decode karenge
            $taglineData = json_decode($sicialDetailsRaw->tagline, true) ?? ['en' => '', 'ar' => ''];
            $copyrightCreditsData = json_decode($sicialDetailsRaw->copyright_credits, true) ?? ['en' => '', 'ar' => ''];

            // Current language ka data update karenge
            $taglineData[$lang] = $request->tagline;
            $copyrightCreditsData[$lang] = $request->copyrightCredits;


            // Direct database update using Query Builder
            DB::table('social_details')
            ->where('id', 1)
            ->update([
                'tagline' => json_encode($taglineData),
                'copyright_credits' => json_encode($copyrightCreditsData),
                'address' => $request->address,
                'email' => $request->email,
                'contact' => $request->contact,
                'facebook' => $request->facebook,
                'twitter' => $request->twitter,
                'instagram' => $request->instagram,
                'linkedin' => $request->linkedin,                
                'updated_at' => now(),
            ]);

            // Response ke liye Model se data fetch karenge (with getters)
            App::setLocale($lang);

            return response()->json([
                'status' => true,
                'socialDetails' => SocialDetail::first(),
                'message' => 'Social details updated successfully!',
            ]);
        }
    }

    public function profile(Request $request)
    {
        // GET request - Data fetch karenge
        if ($request->method() === 'GET') {

            $profile = User::first();
            return response()->json([
                'status' => true,
                'profile' => $profile,
                'message' => null,
            ]);
        } 
        
        // POST request - Data update karenge
        elseif ($request->method() === 'POST') {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()->all(),
                    'message' => null,
                ], 200);
            }

            $profile = User::first();
            $profile->name = $request->name;
            $profile->email = $request->email;

            if($request->password !== null) 
            {
                $profile->password = $request->password;
            }
            $profile->save();

            return response()->json([
                'status' => true,
                'profile' => [
                    'name' => $profile->name,
                    'email' => $profile->email,
                ],
                'message' => 'profile updated successfully!',
            ]);
        }
    }    
}
