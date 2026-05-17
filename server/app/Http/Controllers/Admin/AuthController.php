<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
                'message' => NULL
            ]);       
        }

        $admin = User::where('email', $request->email)->first();

        if($admin)
        {
            if(Hash::check($request->password, $admin->password))
            {
                $token = $admin->createToken('afniah-token')->plainTextToken;

                return response()->json([
                    'status' => true,
                    'token' => $token,
                    'admin' => [
                        'name' => $admin->name,
                        'email' => $admin->email,
                    ],
                    'message' => 'Login successful.'
                ]);
            }
            else
            {
                return response()->json([
                    'status' => false,
                    'errors' => ['The password field is incorrect.'],
                    'message' => NULL
                ]);            
            }
        }
        else
        {
            return response()->json([
                'status' => false,
                'errors' => ['The email field does not exist in our records.'],
                'message' => NULL
            ]);            
        }

        return response()->json([
            'status' => true,
            'message' => 'You query has been sent. We will touch back you soon.'
        ]);
    }

    public function stats()
    {
        return response()->json([
            'status' => true,
            'projects' => Project::count(),
            'services' => Service::count(),
            'message' => NULL
        ]);        
    }    
}
