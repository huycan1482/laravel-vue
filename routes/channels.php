<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/
Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    dd(1);
    // return (int) $user->id === (int) $id;
    return true;
});

Broadcast::channel('room.{id}', function ($user, $id) {
    dd(2);
    return true; // user có thể join vào bất kì chatroom nào 
});
