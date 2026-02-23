<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Post extends Model
{
    // On autorise le remplissage de ces colonnes
    protected $fillable = [
        'message',
        'post_picture',
        'user_id',
        'group_id'
    ];
    // Indique que un post appartient à un utilisateur
    public function user(): BelongsTo|null
    {
        return $this->belongsTo(User::class);
    }
    // Indique que un post appartient à un groupe
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class, 'group_id', 'group_name');
    }
    // Indique que un post peut avoir plusieurs commentaires
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
    public function likers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'liked', 'post_id', 'user_id')
            ->withTimestamps()
            ->updatedAt(null);
    }
}
