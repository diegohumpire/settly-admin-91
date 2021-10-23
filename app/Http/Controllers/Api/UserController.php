<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller 
{
    public function create(CreateUserRequest $createUserRequest) 
    {
        $data = $createUserRequest->json()->all();

        $user = User::create($data);

        return new UserResource($user);
    }
}