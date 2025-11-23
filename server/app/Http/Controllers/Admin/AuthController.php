<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if($validator->fails()) 
        {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all(),
                'message' => 'Please fill all required fields.'
            ]);       
        }

        return response()->json([
            'status' => true,
            'message' => 'You query has been sent. We will touch back you soon.'
        ]);
    }
}
