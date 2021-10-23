<?php

namespace App\Services;

use App\Models\User;

class AuthService 
{
    public function findUserByEmail(string $email) : ?User
    {
        $user = User::where([
            'email' => $email
        ])->first();

        return $user;
    }
}