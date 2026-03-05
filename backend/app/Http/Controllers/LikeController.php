<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function toggle(Post $post)
    {
        $user = auth()->user();

        $result = $user->likedPosts()->toggle($post->id);

        return response()->json([
            'status' => 'success',
            'is_liked' => count($result['attached']) > 0,
            'likes_count' => $post->likers()->count()
        ]);
    }
}
