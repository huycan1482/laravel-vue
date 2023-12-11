<?php

namespace App\Services\Model;

use App\Models\Message;

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
        $res = $this->model->create($data);
        $this->resetModel();
        return $res;
    }

    public function getChatMessages ($chatId)
    {
        if (empty($chatId)) return [];
        $perPage = 10;
        $messages = $this->model::where('chat_id', $chatId)->orderBy('id', 'DESC')->paginate($perPage);

        $data = [
            'data' => $messages->items(),
            'totalCount' => $messages->count(),
            'currentCount' => $messages->perPage(),
            'page' => $messages->currentPage(),
            'lastPage' => $messages->lastPage(),
        ];
        
        return $data;
    }

    public function sendPusher () 
    {
        // $message = $request->input('message', 'Hey 123');
        // $e = event(new MessageEvent($message));
        // return response()->json(['success' => true, 'data' => $message]);
    }
}