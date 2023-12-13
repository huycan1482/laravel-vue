<?php

namespace App\Services\Model;

use App\Models\UserChat;

class UserChatService 
{
    protected $model;

    public function __construct()
    {
        $this->makeModel();
    }

    public function makeModel ()
    {
        $this->model = UserChat::class;
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
}