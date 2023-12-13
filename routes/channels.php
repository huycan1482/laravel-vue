<?php

use App\Services\TelegramService;
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
    // TelegramService::sendMsg("DH chatId".$chatId);
    // TelegramService::sendMsg("DH channel user".json_encode($user));
    $chatsId = $user->getChatsId->pluck('id')->toArray();
    
    return in_array($chatId, $chatsId);
});

// Broadcast::channel('room.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;

//     // return true; // user có thể join vào bất kì chatroom nào 
// });

// Broadcast::channel('*', function ($user, $id) {
//     return true;
// });