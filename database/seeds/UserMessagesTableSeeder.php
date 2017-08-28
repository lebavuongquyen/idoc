<?php

use Illuminate\Database\Seeder;

class UserMessagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_messages')->insert([
            'user_id' => 1,
            'content' => 'Welcome to IDoc',
            'created_at' => \Carbon::now()
        ]);
    }
}
