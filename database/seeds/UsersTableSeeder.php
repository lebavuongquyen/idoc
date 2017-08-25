<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Quyen Le',
            'email' => 'quyen.lbv@gmail.com',
            'password' => bcrypt('123456'),
            'role_id' => 1,
            'is_active' => 1,
            'created_at' => Carbon::now()
        ]);
    }
}
