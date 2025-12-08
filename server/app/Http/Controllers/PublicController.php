<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class PublicController extends Controller
{
    public function contact(Request $request) 
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'subject' => 'required',
            'message' => 'required',
        ]);

        if($validator->fails()) 
        {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all(),
                'message' => 'Please fill all required fields.'
            ]);       
        }

        Mail::to("info@afnps.com")->send(new ContactMail($request->all()));

        return response()->json([
            'status' => true,
            'message' => 'You query has been sent. We will touch back you soon.'
        ]);
    }
}
