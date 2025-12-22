<?php

namespace App\Http\Controllers;

use App\Models\ContactForm;
use App\Models\ContactHero;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

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
}
