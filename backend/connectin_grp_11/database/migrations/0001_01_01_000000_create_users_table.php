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
        Schema::create('users', function (Blueprint $table) {
            // la clé primaire 'id' (INT AUTO_INCREMENT)
            $table->id()->primary();
            // nom de famille (VARCHAR 30)
            $table->string('last_name', 30);
            // prénom (VARCHAR 30)
            $table->string('first_name', 30);
            // adresse mail (VARCHAR 50) unique
            $table->string('mail', 50)->unique();
            // date de naissance (DATE)
            $table->date('birthdate');
            // mot de passe (VARCHAR 255)
            $table->string('password');
            // photo de profil en blob
            $table->binary('profil_pic')->nullable();
            // rôle (INT) 0 pour utilisateur,1 pour modérateur, 2 pour admin
            $table->integer('role');
            // token de réinitialisation de mot de passe
            $table->rememberToken();
            // Laravel gère created_at et updated_at
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
