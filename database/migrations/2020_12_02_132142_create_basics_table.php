<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBasicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('basics', function (Blueprint $table) {
            $table->id();
            $table->integer('orgId');
            $table->integer('step');
            $table->integer('head');
            $table->mediumText('name');
            $table->integer('status');
            // $table->string('userId');
            // $table->string('type');
            // $table->string('tab1');
            // $table->string('tab2')->nullable();
            // $table->string('tab3')->nullable();
            // $table->string('tab4')->nullable();
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
        Schema::dropIfExists('basics');
    }
}
