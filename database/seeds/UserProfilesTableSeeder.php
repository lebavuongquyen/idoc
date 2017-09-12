<?php

use Illuminate\Database\Seeder;

class UserProfilesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('user_profiles')->insert([
            'user_id' => 1,
            'address' => '18/4 ấp Vạn Hạnh , xã Trung Chánh , huyện Hóc Môn'
        ]);
    }
}
