<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('service_section01s', function (Blueprint $table) {
            $table->id();
            $table->text('title');
            $table->text('description');
            $table->text('image');
            $table->text('stats_title');
            $table->text('stats_count');
            $table->text('stats_icon');
            $table->text('service_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_section01s');
    }
};
