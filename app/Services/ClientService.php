<?php

namespace App\Services;

use App\Mail\WeeklyMessage;
use App\Models\Client;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class ClientService 
{
    public function findByUserId(int $userId)
    {
        $clients = $this->getBuilderClientsByUserId($userId)->get();

        return $clients;
    }

    public function sendEmailToClientByUser(int $userId)
    {
        $this->getBuilderClientsByUserId($userId)->chunk(100, function ($clients) {
            foreach ($clients as $client) {
                Mail::to($client->email)->send(new WeeklyMessage($client));
            }
        });
    }

    private function getBuilderClientsByUserId(int $userId) 
    {
        return Client::where([ 'user_id' => $userId])
            ->orderBy('id', 'DESC');
    }
}