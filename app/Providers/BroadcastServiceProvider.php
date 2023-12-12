<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

        Broadcast::routes(['middleware' => 'auth.true']);

        Broadcast::channel('private-room.2', function ($user, $id) {
            return true;
        });

        require base_path('routes/channels.php');

        // Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
        //     return true;
        // });
    }
}
