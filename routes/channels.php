<?php

use App\Services\TelegramService;
use Illuminate\Support\Facades\Auth;
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
// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     // dd(1);
//     return (int) $user->id === (int) $id;
//     // return true;
// });

Broadcast::channel('chat.{chatId}', function ($user, $chatId) {
    $chatsId = $user->getChatsId->pluck('id')->toArray();
    
    return in_array($chatId, $chatsId);
});

Broadcast::channel('room.{chatId}', function ($user, $chatId) {
    $chatsId = $user->getChatsId->pluck('id')->toArray();

    // $user = $user->pluck('id', 'name', 'image');
    return in_array($chatId, $chatsId) ? $user : [];
});
