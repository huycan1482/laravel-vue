<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // User::factory(10)->create();

        DB::table('users')->insert([
            'name' => 'huy',
            'email' => 'huy@gmail.com',
            'password' => '123456789',
            'password_active' => 1,
        ]);
    }
}
