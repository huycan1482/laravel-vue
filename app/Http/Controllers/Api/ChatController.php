<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Chat\AddUserRequest;
use App\Models\Chat;
use App\Models\User;
use App\Models\UserChat;
use App\Services\Model\ChatService;
use App\Services\TelegramService;
use Google\Service\CloudSourceRepositories\Repo;
use Google\Service\DataprocMetastore\TelemetryConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ChatController extends Controller
{
    public function __construct()
    {
        
    }

    public function getAll()
    {
        $chats = Chat::all();
        return response(['success' => true, 'chats' => $chats]);
    }

    public function search (Request $request)
    {
        $chats = Chat::select('chats.*')->join('user_chat', 'user_chat.chat_id', '=', 'chats.id')
        ->where('user_chat.user_id', Auth::guard('api')->user()->id)->paginate(5);

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
            $res = Storage::disk('public')->putFileAs('uploads/chat', $request->image, $imageName);
            $data['image'] = 'uploads/chat/'.$imageName;
        }

        // $data['slug'] = Str::slug($request->input('name'));
        // $data['parent_id'] = 0;
        $data['status'] = ChatService::$STATUS_ACTIVE;
        $data['user_create'] = Auth::user()->id;

        $chat = Chat::create($data);

        $data = [
            'user_id' => Auth::user()->id,
            'chat_id' => $chat->id,
        ];

        UserChat::create($data);

        return response()->json(['success' => true, 'data' => $chat]);
    }

    public function getChatRoom (Request $request, $id)
    {
        $chat = Chat::find($id);

        return response(['success' => true, 'data' => $chat]);
    }

    public function addUser (AddUserRequest $request)
    {
        // dd($request->all());
        // $user = User::where('email', $request->input('user_email'))->first();

        // if(empty($user)) {
        //     return response(['success' => false, 'data' => [], 'message' => 'User not found']);
        // }

        // $data = $request->only('user_id', 'chat_id');
        // $search = UserChat::where(['user_id' => $data['user_id'], 'chat_id' => $data['chat_id']])->first();

        $data = $request->only('chat_id', 'user_id');
        $search = UserChat::where(['user_id' => $data['user_id'], 'chat_id' => $data['chat_id']])->first();

        if (!empty($search)) {
            return response(['success' => false, 'data' => [], 'message' => 'User already exists']);
        }

        // $data['user_id'] = $user->id;
        $res = UserChat::create($data);

        return response(['success' => !empty($res) ? true : false, 'data' => [], 'message' => '']);
    }

    //lấy dữ liệu user dùng cho select2
    public function getUsers(Request $request)
    {

        $users = User::select('users.id as value', 'users.email as label')->whereRaw('users.id NOT IN (SELECT users.id FROM users JOIN user_chat ON user_chat.user_id = users.id WHERE chat_id = '.$request->input('chatId', 0).')')->paginate(5);

        $data = [
            'data' => $users->items(),
            'totalCount' => $users->count(),
            'currentCount' => $users->perPage(),
            'page' => $users->currentPage(),
            'lastPage' => $users->lastPage(),
        ];

        return response(['success' => true, 'data' => $data]);
    }
}
