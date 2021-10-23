<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AccessRequest;
use App\Http\Resources\AccessResource;
use App\Objects\Access;
use App\Services\AuthService;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AccessController extends Controller 
{
    private AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function create(AccessRequest $request) 
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = $this->authService->findUserByEmail($request->email);
            $token = $user->createToken($request->email);

            $access = new Access([
                'access_token' => $token->plainTextToken,
                'name' => $user->name,
                'email' => $user->email
            ]);

            return new AccessResource($access);
        }

        return response()->json([
            'message' => 'Invalid credentials'
        ], Response::HTTP_FORBIDDEN);
    }
}