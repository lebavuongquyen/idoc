<?php

use Illuminate\Database\Seeder;

class AdminPermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admin_permissions')->insert([
            'name' => 'dashboard',
            'group_ids'=>'[1]',
        ]);
    }
}
