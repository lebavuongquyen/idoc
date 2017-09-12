<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserGroupsTableSeeder::class);
        $this->call(UserRolesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(AdminPermissionsTableSeeder::class);
        $this->call(UserMessagesTableSeeder::class);
        $this->call(UserInfoesTableSeeder::class);
    }

}
