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
        Schema::create('comments', function (Blueprint $table) {
            // la clé primaire 'id' (INT AUTO_INCREMENT)
            $table->id();
            // le message du commentaire (VARCHAR 255)
            $table->string('message', 255);
            // Relation avec Posts (clé étrangère classique)
            $table->foreignId('post_id')->constrained('posts')->onDelete('cascade');
            // Clé étrangère vers l'auteur du commentaire
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            // Laravel gère created_at et updated_at
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
