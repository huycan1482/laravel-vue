<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $table = "messages";

    protected $fillable = [
        'sender_id', 'chat_id', 'content', 'image', 'status', 
    ];

    public function sender () 
    {
        return $this->hasOne('App\Models\User', 'id', 'sender_id');
    }
}
