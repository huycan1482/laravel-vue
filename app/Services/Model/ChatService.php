<?php

namespace App\Services\Model;

use App\Models\Chat;

class ChatService 
{
    static $STATUS_ACTIVE = 1;
    static $STATUS_DISABLE = 0;

    protected $model;

    public function __construct()
    {
        $this->makeModel();
    }

    public function makeModel ()
    {
        $this->model = Chat::class;
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