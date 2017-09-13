<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('user_profiles' , function(Blueprint $table){
            $table->increments('id');
            $table->integer('user_id')->unique();
            $table->string('address')->nullable();
            $table->string('school')->nullable();
            $table->string('phone')->nullable();
            $table->string('hometown')->nullable();
            $table->text('about')->nullable();
            $table->string('religious')->nullable();
            $table->string('gender')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::dropIfExists('user_profiles');
    }
}
