<?php

namespace App\Http\Controllers;

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

class ServiceController extends Controller
{
    public function hero(Request $request)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $hero = ServiceHero::first();

        return response()->json([
            'status' => true,
            'hero' => $hero,
            'message' => null,
        ]);
    }

    public function whatWeOffer(Request $request)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $whatWeOffer = ServiceWhatWeOffer::first();

        return response()->json([
            'status' => true,
            'whatWeOffer' => $whatWeOffer,
            'message' => null,
        ]);
    }
    
    public function list(Request $request)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $services = Service::all();

        return response()->json([
            'status' => true,
            'services' => $services,
            'message' => null,
        ]);
    } 
    
    public function single(Request $request, $id)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $service = Service::find($id);

        return response()->json([
            'status' => true,
            'service' => $service,
            'message' => null,
        ]);
    }
    
    public function singleSection01(Request $request, $id)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $section01 = ServiceSection01::whereServiceId($id)->first();

        return response()->json([
            'status' => true,
            'section01' => $section01,
            'message' => null,
        ]);
    }
    
    public function singleSection01Bullets(Request $request, $id)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $section01Bullets = ServiceSection01Bullet::whereServiceId($id)->get();

        return response()->json([
            'status' => true,
            'section01Bullets' => $section01Bullets,
            'message' => null,
        ]);
    }
    
    public function singleSection02(Request $request, $id)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $section02 = ServiceSection02::whereServiceId($id)->first();

        return response()->json([
            'status' => true,
            'section02' => $section02,
            'message' => null,
        ]);
    }
    
    public function singleSection02Bullets(Request $request, $id)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $section02Bullets = ServiceSection02Bullet::whereServiceId($id)->get();

        return response()->json([
            'status' => true,
            'section02Bullets' => $section02Bullets,
            'message' => null,
        ]);
    }
    
    public function singleSection03(Request $request, $id)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $section03 = ServiceSection03::whereServiceId($id)->first();

        return response()->json([
            'status' => true,
            'section03' => $section03,
            'message' => null,
        ]);
    }
    
    public function singleSection03Bullets(Request $request, $id)
    {
        App::setLocale($request->header('Accept-Language', 'en'));
        $section03Bullets = ServiceSection03Bullet::whereServiceId($id)->get();

        return response()->json([
            'status' => true,
            'section03Bullets' => $section03Bullets,
            'message' => null,
        ]);
    }    

}
