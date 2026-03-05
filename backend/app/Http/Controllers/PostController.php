<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use DB;
use Log;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = auth('sanctum')->id();

        $posts = Post::with([
            'user:id,first_name,last_name,profil_pic',
            'comments.user:id,first_name,last_name,profil_pic'
        ])
            ->withCount('likers')
            ->withExists(['likers as is_liked_by_user' => function ($query) use ($userId) {
                $query->where('user_id', $userId);
            }])
            ->latest()
            ->get();

        return response()->json($posts);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //on utilise pas cette méthode car on gère la création de post via une API, pas de formulaire HTML classique
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validation : Le rempart de sécurité
        $validated = $request->validate([
            'message' => 'required|string|max:255',
            'group_id' => 'nullable|exists:groups,group_name',
            'post_picture' => 'nullable|image|max:2048',
        ]);

        // Début de la transaction : Tout ou rien
        DB::beginTransaction();

        try {
            // Logique de l'image
            $imagePath = null;
            if ($request->hasFile('post_picture')) {
                // On stocke l'image dans storage/app/public/posts
                $imagePath = $request->file('post_picture')->store('posts', 'public');
            }

            // Création du Post
            $post = Post::create([
                'message' => $validated['message'],
                'group_id' => $validated['group_id'],
                'user_id' => auth()->id(), // On prend l'ID de l'utilisateur connecté
                'post_picture' => $imagePath,
            ]);

            // Si on arrive ici sans erreur, on valide en base de données
            DB::commit();

            // On renvoie le post avec son auteur pour React
            return response()->json([
                'message' => 'Post créé avec succès !',
                'data' => $post->load('user:id,first_name,last_name,profil_pic')
            ], 201);
        } catch (\Exception $e) {
            // En cas de pépin (erreur SQL, disque plein, etc.), on annule tout
            DB::rollBack();

            // Si une image a été uploadée avant le crash, on la supprime pour pas polluer le serveur
            if ($imagePath) {
                Storage::disk('public')->delete($imagePath);
            }

            Log::error("Erreur création post : " . $e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la création du post.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post = $post->load('user:id,first_name,last_name,profil_pic')
            ->loadCount('likers');
        return response()->json($post);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        Gate::authorize('update', $post);
        $validated = $request->validate([
            'message' => 'required|string|max:255',
            'group_id' => 'nullable|exists:groups,group_name',
        ]);
        try {
            $post->update($validated);
        } catch (\Exception $e) {
            Log::error("Erreur mise à jour post : " . $e->getMessage());
            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour du post.',
                'error' => $e->getMessage()
            ], 500);
        }
        return response()->json($post, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        Gate::authorize('delete', $post);
        try {
            // Si le post a une image, on la supprime du stockage
            if ($post->post_picture) {
                Storage::disk('public')->delete($post->post_picture);
            }
            $post->delete();
        } catch (\Exception $e) {
            Log::error("Erreur suppression post : " . $e->getMessage());
            return response()->json([
                'message' => 'Une erreur est survenue lors de la suppression du post.',
                'error' => $e->getMessage()
            ], 500);
        }
        return response()->json(['message' => 'Post supprimé avec succès.'], 200);
    }
}
