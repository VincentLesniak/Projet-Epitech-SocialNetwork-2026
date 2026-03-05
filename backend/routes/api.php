<?php
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LikeController;
use App\Http\Middleware\CheckBanned;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware(['auth:sanctum', CheckBanned::class]);

#region Auth
Route::middleware(CheckBanned::class)->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});


// Le groupe protégé par "auth:sanctum", tout ce qui se fait avec la nécessité d'être connécté se fait ici
Route::middleware(['auth:sanctum', CheckBanned::class])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});
#endregion

#region post(table)
Route::middleware(['auth:sanctum', CheckBanned::class])->group(function () {
    // route pour liké un post
    Route::post('/posts/{post}/like', [LikeController::class, 'toggle']);
    // route pour créer un post
    Route::post('posts', [\App\Http\Controllers\PostController::class, 'store']);
    //update un post
    Route::put('posts/{post}', [\App\Http\Controllers\PostController::class, 'update']);
    //delete un post
    Route::delete('posts/{post}', [\App\Http\Controllers\PostController::class, 'destroy']);
    // route pour récupérer les posts
    Route::get('posts', [\App\Http\Controllers\PostController::class, 'index']);

    // montre un post spécifique
    Route::get('posts/{post}', [\App\Http\Controllers\PostController::class, 'show']);
});


#endregion

#region comments
Route::middleware(['auth:sanctum', CheckBanned::class])->group(function () {
    // route pour créer un commentaire
    Route::post('comments', [\App\Http\Controllers\CommentController::class, 'store']);
    // update un commentaire
    Route::put('comments/{comment}', [\App\Http\Controllers\CommentController::class, 'update']);
    // delete un commentaire
    Route::delete('comments/{comment}', [\App\Http\Controllers\CommentController::class, 'destroy']);
    // route pour récupérer les commentaires
    Route::get('comments', [\App\Http\Controllers\CommentController::class, 'index']);

    // montre un commentaire spécifique
    Route::get('comments/{comment}', [\App\Http\Controllers\CommentController::class, 'show']);
    #endregion

});



#region Users
Route::middleware(['auth:sanctum', CheckBanned::class])->group(function () {
    # C
    Route::get('/users', [UserController::class, 'index']);
    # R
    Route::get('/users/{user}', [UserController::class, 'show']);
    # U
    Route::put('/users/{user}', [UserController::class, 'update']);
    // suppression de la pdp
    Route::delete('/users/{user}/profil-pic', [UserController::class, 'deleteProfilPic']);
    // D soft delete
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
    //hard delete
    Route::delete('/users/{user}/force', [UserController::class, 'forceDestroy']);
});