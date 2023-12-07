<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chat;
use Google\Service\CloudSourceRepositories\Repo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ChatController extends Controller
{
    public function getAll()
    {
        $chats = Chat::all();
        return response(['success' => true, 'chats' => $chats]);
    }

    public function search (Request $request)
    {
        $chats = Chat::paginate(5);

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

    public function store (Request $request)
    {
        $data = $request->only('name');

        if ($request->has('image')) {
            $imageName = time().'-'.$request->image->getClientOriginalName();
            // $res = Storage::disk('public')->putFileAs('uploads/chat', $request->image, $imageName);
            $data['image'] = 'uploads/chat/'.$imageName;
        }

        // $data['slug'] = Str::slug($request->input('name'));
        // $data['parent_id'] = 0;
        $data['status'] = 1;

        $chat = Chat::create($data);

        return response()->json(['success' => true, 'data' => $chat]);
    }

    public function getChatRoom (Request $request, $id)
    {
        
    }
}
