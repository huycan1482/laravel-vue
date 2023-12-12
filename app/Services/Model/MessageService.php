<?php

namespace App\Services\Model;

use App\Events\MessageEvent;
use App\Models\Message;
use App\Services\TelegramService;
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

    public function getChatMessages ($chatId)
    {
        if (empty($chatId)) return [];
        $perPage = 10;
        $messages = $this->model::where('chat_id', $chatId)->orderBy('id', 'ASC')->paginate($perPage);

        $data = [
            'data' => $messages->items(),
            'totalCount' => $messages->count(),
            'currentCount' => $messages->perPage(),
            'page' => $messages->currentPage(),
            'lastPage' => $messages->lastPage(),
        ];
        
        return $data;
    }

    public function sendMessage($data)
    {
        $res = $this->create($data);
        $this->sendPusher($res);
        return $res;
    }

    public function sendPusher ($data) 
    {
        
        $e = event(new MessageEvent($data));

        // $e = broadcast(new MessageEvent($data))->toOthers();
        TelegramService::sendMsg("Send Pusher".json_encode($e));
        // return $message;
        // return response()->json(['success' => true, 'data' => $message]);
    }
}