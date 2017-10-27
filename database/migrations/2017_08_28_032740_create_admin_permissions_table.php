<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdminPermissionsTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        try {
            Schema::create('admin_permissions', function(Blueprint $table) {
                $table->increments('id');
                $table->string('name', 250)->unique();
                $table->string('group_ids', 250)->nullable();
                $table->string('role_ids', 250)->nullable();
                $table->string('user_ids', 250)->nullable();
                $table->string('banned_user_ids', 250)->nullable();
            });
        } catch (Exception $ex) {
            
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admin_permissions');
    }
}
