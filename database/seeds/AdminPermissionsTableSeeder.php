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
            [
                'name'      => 'admin/dashboard',
                'group_ids' => '[1]',
            ],
            [
                'name'      => 'admin/setting',
                'group_ids' => '[1]',
            ],
            [
                'name'      => 'admin/setting_save',
                'group_ids' => '[1]',
            ],
        ]);

    }

}
