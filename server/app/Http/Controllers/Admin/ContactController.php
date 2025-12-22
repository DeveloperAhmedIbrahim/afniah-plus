<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactForm;
use App\Models\ContactHero;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function hero(Request $request)
    {
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);
            
            $hero = ContactHero::first();
            
            if($hero === null) {
                $hero = new ContactHero();
                $hero->title = json_encode(['en' => '', 'ar' => '']);
                $hero->subtitle = json_encode(['en' => '', 'ar' => '']);
                $hero->image = '';
                $hero->save();
            }

            return response()->json([
                'status' => true,
                'hero' => ContactHero::first(),
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
            $contactRaw = DB::table('contact_heroes')->first();

            if (!$contactRaw) {
                return response()->json([
                    'status' => false,
                    'errors' => ['Contact not found'],
                    'message' => null,
                ], 404);
            }

            $titleData = json_decode($contactRaw->title, true) ?? ['en' => '', 'ar' => ''];
            $subTitleData = json_decode($contactRaw->subtitle, true) ?? ['en' => '', 'ar' => ''];
            $imageData = json_decode($contactRaw->image, true) ?? ['en' => '', 'ar' => ''];

            $titleData[$lang] = $request->title;
            $subTitleData[$lang] = $request->subtitle;

            // Image upload handling
            if ($request->hasFile('image')) {
                $uploadPath = public_path("uploads/contact/hero/");

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

                $imageData[$lang] = "uploads/contact/hero/" . $imageName;
            }

            DB::table('contact_heroes')
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
                'hero' => ContactHero::first(),
                'message' => 'Contact hero updated successfully!',
            ]);
        }
    }

    public function form(Request $request)
    {
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);
            
            $form = ContactForm::first();

            if($form === null) {
                $form = new ContactForm();
                $form->title = json_encode(['en' => '', 'ar' => '']);
                $form->subtitle = json_encode(['en' => '', 'ar' => '']);
                $form->smtp_mailer = '';
                $form->smtp_host = '';
                $form->smtp_port = '';
                $form->smtp_username = '';
                $form->smtp_password = '';
                $form->smtp_from_name = '';
                $form->smtp_from_address = '';
                $form->smtp_encryption = '';
                $form->save();
            }

            return response()->json([
                'status' => true,
                'form' => ContactForm::first(),
                'message' => null,
            ]);
        } 
        
        // POST request - Data update karenge
        elseif ($request->method() === 'POST') {
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
            $contactRaw = DB::table('contact_forms')->first();

            if (!$contactRaw) {
                return response()->json([
                    'status' => false,
                    'errors' => ['Contact not found'],
                    'message' => null,
                ], 404);
            }

            $titleData = json_decode($contactRaw->title, true) ?? ['en' => '', 'ar' => ''];
            $subTitleData = json_decode($contactRaw->subtitle, true) ?? ['en' => '', 'ar' => ''];

            $titleData[$lang] = $request->title;
            $subTitleData[$lang] = $request->subtitle;

            DB::table('contact_forms')
            ->where('id', 1)
            ->update([
                'title' => json_encode($titleData),
                'subtitle' => json_encode($subTitleData),
                'smtp_mailer' => $request->mailer,
                'smtp_host' => $request->host,
                'smtp_port' => $request->port,
                'smtp_username' => $request->username,
                'smtp_password' => $request->password,
                'smtp_from_name' => $request->fromName,
                'smtp_from_address' => $request->fromAddress,
                'smtp_encryption' => $request->encryption,                
                'updated_at' => now(),
            ]);

            App::setLocale($lang);

            return response()->json([
                'status' => true,
                'hero' => ContactForm::first(),
                'message' => 'Contact form updated successfully!',
            ]);
        }
    }    
}
