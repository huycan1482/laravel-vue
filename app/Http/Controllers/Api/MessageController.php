<?php

namespace App\Http\Controllers\Api;

use App\Events\MessageEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Message\CreateRequest;
use App\Models\Message;
use App\Models\User;
use App\Services\Model\MessageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class MessageController extends Controller
{
    private $messageService;

    public function __construct(MessageService $messageService)
    {
        $this->messageService = $messageService;
    }
    
    public function getAll (Request $request)
    {
        $messages = Message::all();
        return response()->json(['success' => true, 'data' => $messages]);
    }

    public function getChatMessages (Request $request)
    {
        $chatId = $request->input('chat_id', '');
        $lastId = $request->input('last_id', '');
        $messages = $this->messageService->getChatMessages($chatId, $lastId);
        $total = $this->messageService->countMess($chatId);
        return response()->json(['success' => true, 'data' => ['data' => $messages, 'total' => $total]]);
    }

    public function sendMessage (CreateRequest $request)
    {
        $data = $request->only('sender_id', 'chat_id', 'content');
        $data['image'] = MessageService::$STATUS_FAIL;
        $data['status'] = MessageService::$STATUS_ACTIVE;

        $message = $this->messageService->sendMessage($data);

        return response(['success' => true, 'data' => $message]);
    }
}
