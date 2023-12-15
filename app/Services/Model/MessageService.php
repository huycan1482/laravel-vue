<?php

namespace App\Services\Model;

use App\Events\MessageEvent;
use App\Events\SendPrivateMessage;
use App\Models\Message;
use App\Services\TelegramService;
use Illuminate\Support\Facades\DB;

// use App\Events\MessagePosted;

class MessageService
{
    static $STATUS_ACTIVE = 1;
    static $STATUS_FAIL = 0;

    protected $model;

    public function __construct()
    {
        $this->makeModel();
    }

    public function makeModel ()
    {
        $this->model = Message::class;
    }

    public function resetModel()
    {
        $this->makeModel();
    }


    public function create ($data)
    {
        $res = $this->model::create($data);
        $this->resetModel();
        return $res;
    }

    public function getChatMessages ($chatId, $lastId)
    {
        if (empty($chatId)) return [];
        $perPage = 5;
        $messages = $this->model::where('chat_id', '=', $chatId);
        if (!empty($lastId)) {
            $messages = $messages->where('id', '<', $lastId);
        }
        $messages = $messages->orderBy('id', 'DESC')->limit($perPage)->get();
        return $messages;
    }

    public function countMess ($chatId) 
    {
        $count = $this->model::where('chat_id', '=', $chatId)->count();
        return $count;
    }

    public function sendMessage($data)
    {
        $res = $this->create($data);
        $this->sendPusher($res);
        return $res;
    }

    public function sendPusher ($data) 
    {
        $e = event(new SendPrivateMessage($data));
        // $e = broadcast(new MessageEvent($data))->toOthers();
        // TelegramService::sendMsg("Send Pusher".json_encode($e));
        // return $message;
        // return response()->json(['success' => true, 'data' => $message]);
    }
}