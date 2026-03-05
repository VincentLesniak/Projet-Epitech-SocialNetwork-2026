<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model {
    // On indique que ce modèle utilise les factories pour les tests et le seeding
    use HasFactory;
    // On autorise le remplissage de ces colonnes
    protected $fillable = [
        'message',
        'post_id', 
        'user_id'
        ];

    // Relation : Un commentaire appartient à un utilisateur
    public function user() {
        return $this->belongsTo(User::class);
    }

    // Relation : Un commentaire appartient à un post
    public function post() {
        return $this->belongsTo(Post::class);
    }
}
