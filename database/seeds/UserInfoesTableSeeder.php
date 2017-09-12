<?php

use Illuminate\Database\Seeder;

class UserInfoesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('user_infoes')->insert([
            'user_id' => 1
        ]);
    }
}
