<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AccessRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class AccessController extends Controller 
{
    public function create(AccessRequest $request) 
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = User::where([
                'email' => $request->email
            ])->first();

            $token = $user->createToken($request->email);

            return response()->json([
                'access_token' => $token->plainTextToken,
                'name' => $user->name,
                'email' => $user->email
            ]);
        }

        return response()->json([
            'message' => 'Invalid credentials'
        ], 501);
    }
}