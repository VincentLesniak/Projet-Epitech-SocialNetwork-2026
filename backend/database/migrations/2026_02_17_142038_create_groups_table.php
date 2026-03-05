<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('groups', function (Blueprint $table) {
            // la 'group_name' clé primaire (VARCHAR 50)
            $table->string('group_name', 50)->primary();
            // la banner en blob
            $table->binary('banner')->nullable();
            // la description (VARCHAR 500)
            $table->string('description', 500)->nullable();
            // Laravel gère created_at et updated_at
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groups');
    }
};
