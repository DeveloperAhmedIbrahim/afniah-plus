<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use App\Models\ContactForm;
use App\Models\ContactHero;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function hero(Request $request)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $hero = ContactHero::first();

        return response()->json([
            'status' => true,
            'hero' => $hero,
            'message' => null,
        ]);
    }

    public function form(Request $request)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $form = ContactForm::first();

        return response()->json([
            'status' => true,
            'form' => $form,
            'message' => null,
        ]);
    }
    
    public function submit(Request $request) 
    {
        $validator = Validator::make($request->all(), [
            'name' =>'required|regex:/^[a-zA-Z\s]+$/',
            'email' => 'required|email',
            'phone' => 'required|regex:/^\d{7,15}$/',             
            'subject' => 'required',
            'message' => 'required|max:500',
        ]);


        if($validator->fails()) 
        {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all(),
                'message' => 'Please fill all required fields.'
            ]);       
        }

        $config = ContactForm::first();

        Config::set('mail.default', $config->smtp_mailer);

        Config::set('mail.mailers.smtp', [
            'transport' => $config->smtp_mailer,
            'host' => $config->smtp_host,
            'port' => $config->smtp_port,
            'encryption' => $config->smtp_encryption,
            'username' => $config->smtp_username,
            'password' => $config->smtp_password,
        ]);

        Config::set('mail.from.address', $config->smtp_from_address);
        Config::set('mail.from.name', $config->smtp_from_name);

        // Mail::to("info@afnps.com")->send(new ContactMail($request->all()));
        Mail::to("siddiqui.ahmedibrahim@gmail.com")->send(new ContactMail($request->all()));

        return response()->json([
            'status' => true,
            'message' => 'You query has been sent. We will touch back you soon.'
        ]);
    }    
}
