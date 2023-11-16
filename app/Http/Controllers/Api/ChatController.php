<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chat;
use Google\Service\CloudSourceRepositories\Repo;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function getAll()
    {
        $chats = Chat::all();
        return response(['success' => true, 'chats' => $chats]);
    }

    public function getUserChat (Request $request)
    {
        
    }
}
