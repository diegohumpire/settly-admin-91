<?php

namespace App\Console\Commands;

use App\Services\AuthService;
use App\Services\ClientService;
use Illuminate\Console\Command;

class WeeklyMessageCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'messages:weekly';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send weekly message to clients';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $userEmail = $this->ask('Admin email?');
        
        $authService = app(AuthService::class);
        $user = $authService->findUserByEmail($userEmail);

        if ($user) {
            $this->info('User found!');

            if ($this->confirm('Do you wish to continue?', true)) {
                $clientService = app(ClientService::class);
                
                $this->info('Loading!');

                $clientService->sendEmailToClientByUser($user->id);
            }
        } else {
            $this->error('User not found!');
        }
    }
}
