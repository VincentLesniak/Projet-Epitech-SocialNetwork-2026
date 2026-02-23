<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Group extends Model
{
    use HasFactory;

    // Configuration de la clé primaire 
    protected $primaryKey = 'group_name';
    public $incrementing = false;
    protected $keyType = 'string';

    // Les colonnes autorisées pour le remplissage en masse
    protected $fillable = [
        'group_name',
        'banner',
        'description',
    ];
    // Indique que un groupe peut avoir plusieurs posts
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, 'group_id', 'group_name');
    }
    // Indique que un groupe peut avoir plusieurs utilisateurs et qu'un utilisateur peut appartenir à plusieurs groupes
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_groups', 'group_id', 'user_id')
            ->withTimestamps(); // Ton SQL contient created_at/updated_at sur la pivot
    }
}