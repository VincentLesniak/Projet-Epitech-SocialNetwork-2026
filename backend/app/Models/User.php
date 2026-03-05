<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable {
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'last_name',
        'first_name',
        'mail',
        'birthdate',
        'password',
        'role',
        'profil_pic',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    // On indique que 'password' doit être automatiquement haché et que 'email_verified_at' est une datetime
    protected function casts(): array {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function posts(): HasMany {
        return $this->hasMany(Post::class);
    }
    public function comments(): HasMany {
        return $this->hasMany(Comment::class);
    }
    public function groups(): BelongsToMany{
        // On précise : Table pivot, clé étrangère locale, clé étrangère distante
        return $this->belongsToMany(Group::class, 'user_groups', 'user_id', 'group_id')
                    ->withTimestamps();
    }
    public function likedPosts(): BelongsToMany{
        // On indique que cette relation utilise la table 'liked' avec 'user_id' et 'post_id' comme clés étrangères 
        // (user est récupéré via auth()->user() dans le controller et post via la route model binding)
        return $this->belongsToMany(Post::class, 'liked', 'user_id', 'post_id');
    }
}
