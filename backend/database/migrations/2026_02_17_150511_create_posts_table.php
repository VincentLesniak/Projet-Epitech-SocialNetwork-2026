<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('posts', function (Blueprint $table) {
            // la clé primaire 'id' (INT AUTO_INCREMENT)
            $table->id();
            // le message (VARCHAR 255)
            $table->string('message', 255);
            // le lien de la photo
            $table->string('post_picture', 255)->nullable();
            // Relation avec Users (clé étrangère classique)
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            // Relation avec Groups (attention : on pointe vers un string, pas un id !)
            $table->string('group_id', 50)->nullable();
            // On définit la clé étrangère manuellement pour le champ group_id
            $table->foreign('group_id')->references('group_name')->on('groups')->onDelete('set null');
            // Laravel gère created_at et updated_at
            $table->timestamps(); // Pour created_at et updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('posts');
    }
};  
