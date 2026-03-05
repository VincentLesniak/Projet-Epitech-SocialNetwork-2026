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
        Schema::create('user_groups', function (Blueprint $table) {
            // Clés étrangères vers users et groups
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('group_id', 50);
            // Définir la relation avec la table groups
            $table->foreign('group_id')->references('group_name')->on('groups')->onDelete('cascade');
            // Clé primaire composée
            $table->primary(['user_id', 'group_id']);
            // Laravel gère created_at et updated_at
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_groups');
    }
};
