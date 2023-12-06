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

    public function search (Request $request)
    {
        $chats = Chat::paginate(1);

        $data = [
            'data' => $chats->items(),
            'totalCount' => $chats->count(),
            'currentCount' => $chats->perPage(),
            'page' => $chats->currentPage(),
            'lastPage' => $chats->lastPage(),
        ];

        return response()->json(['success' => true, 'data' => $data]);
    }

    public function getUserChat (Request $request)
    {
        
    }

    public function create (Request $request)
    {

    }
}
