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
                'name'      => 'admin.dashboard',
            ],
            [
                'name'      => 'admin.setting',
            ],
            [
                'name'      => 'admin.setting_save',
            ],
            [
                'name'      => 'admin.setting_delete',
            ],
            [
                'name'      => 'admin.admin_permission',
            ],
            [
                'name'      => 'admin.admin_permission_grant',
            ],
        ]);

    }

}
