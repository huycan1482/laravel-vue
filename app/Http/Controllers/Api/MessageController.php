<?php

namespace App\Http\Controllers\Api;

use App\Events\MessageEvent;
use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function getAll (Request $request)
    {
        $messages = Message::all();
        return response()->json(['success' => true, 'data' => $messages]);
    }

    public function sendMessage (Request $request)
    {
        $message = $request->input('message', 'Hey');
        event(new MessageEvent($message));
        return response()->json(['success' => true, 'data' => $message]);
    }
}
