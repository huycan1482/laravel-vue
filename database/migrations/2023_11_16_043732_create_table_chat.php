<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableChat extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chats', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('image', 255);
            $table->bigInteger('user_create')->unsigned();
            $table->integer('status');
            $table->timestamps(); 
        });

        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('sender_id')->unsigned();
            $table->bigInteger('chat_id')->unsigned();
            $table->text('content');
            $table->string('image', 255);
            $table->integer('status');
            $table->timestamps(); 
        });

        Schema::create('user_chat', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('chat_id')->unsigned();
            $table->timestamps(); 
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('table_chat');
    }
}
