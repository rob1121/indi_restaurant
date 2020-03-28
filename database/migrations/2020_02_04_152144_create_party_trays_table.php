<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePartyTraysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('party_trays', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('tray');
            $table->string('veg');
            $table->string('non_veg');
            $table->string('seafood');
            $table->string('bread');
            $table->string('rice');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('party_trays');
    }
}
