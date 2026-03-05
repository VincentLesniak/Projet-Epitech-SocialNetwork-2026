import { useState } from "react";
import axios from "../api/axios";
import Addcomment from "./Addcomment";
import Comment from "./Comment";

const Post = ({ data, currentUser, onDeleteSuccess }) => {
  const [showComments, setShowComments] = useState(false);
  const [localComments, setLocalComments] = useState(data.comments || []);
  const [likesCount, setLikesCount] = useState(data.likers_count || 0);
  const [isLiked, setIsLiked] = useState(!!data.is_liked_by_user);
  const [isLiking, setIsLiking] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [postContent, setPostContent] = useState(data.message);
  const [isUpdating, setIsUpdating] = useState(false);

  const { created_at, user, id } = data;

  const isAuthor = currentUser && user && currentUser.id === user.id;

  const fullName = user
    ? `${user.first_name} ${user.last_name}`
    : "Utilisateur inconnu";

  const avatarUrl = user?.profil_pic
    ? `http://localhost:8000/storage/${user.profil_pic}`
    : `https://ui-avatars.com/api/?name=${fullName}&background=random`;

  const dateFormatted = new Date(created_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  // GESTION DU LIKE
  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      const response = await axios.post(`/posts/${id}/like`);
      setIsLiked(response.data.is_liked);
      setLikesCount(response.data.likes_count);
    } catch (error) {
      console.error("Erreur lors du like :", error);
    } finally {
      setIsLiking(false);
    }
  };

  // GESTION DE LA SUPPRESSION
  const handleDelete = async () => {
    if (window.confirm("Voulez-vous vraiment supprimer cette publication ?")) {
      try {
        await axios.delete(`/posts/${id}`);
        if (onDeleteSuccess) onDeleteSuccess(id);
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  // GESTION DE LA MISE À JOUR
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await axios.put(`/posts/${id}`, { message: postContent });
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCommentAdded = (newComment) => {
    setLocalComments((prev) => [...prev, newComment]);
  };

  return (
    <article className="bg-white border border-slate-200 rounded-xl shadow-sm mb-6 overflow-hidden relative">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={avatarUrl}
            alt={fullName}
            className="w-10 h-10 rounded-full object-cover border border-slate-100"
          />
          <div>
            <p className="font-bold text-slate-800 text-sm hover:underline cursor-pointer leading-tight">
              {fullName}
            </p>
            <p className="text-slate-500 text-xs">{dateFormatted}</p>
          </div>
        </div>

        {isAuthor && (
          <div className="flex gap-1">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Modifier"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Supprimer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="px-4 pb-4">
        <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-wrap">
          {postContent}
        </p>
      </div>

      <div className="px-4 py-2 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center">
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors flex items-center gap-2"
        >
          <span className="text-xs">{showComments ? "▲" : "▼"}</span>
          {showComments
            ? "Masquer les commentaires"
            : `Commentaires ${localComments.length > 0 ? `(${localComments.length})` : ""}`}
        </button>

        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all active:scale-90 ${
            isLiked
              ? "bg-pink-50 border-pink-100 text-pink-600"
              : "bg-white border-slate-100 text-slate-400 hover:border-pink-100 hover:text-pink-500"
          }`}
        >
          <svg
            className={`w-4 h-4 transition-transform ${isLiked ? "fill-current scale-110" : "fill-none stroke-current"}`}
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="text-xs font-bold">{likesCount}</span>
        </button>
      </div>

      {showComments && (
        <section className="bg-slate-50/30 border-t border-slate-100 p-4 space-y-4">
          <Addcomment
            postId={id}
            onCommentAdded={handleCommentAdded}
            user={currentUser}
          />
          <div className="space-y-4 mt-4">
            {localComments.length > 0 ? (
              localComments.map((comment) => (
                <Comment
                  key={comment.id}
                  data={comment}
                  currentUser={currentUser}
                  onDeleteSuccess={(id) =>
                    setLocalComments(localComments.filter((c) => c.id !== id))
                  }
                />
              ))
            ) : (
              <p className="text-center text-slate-400 text-xs py-4 italic">
                Aucun commentaire.
              </p>
            )}
          </div>
        </section>
      )}

      {/* MODALE DE MODIFICATION */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl animate-in zoom-in duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">
                Modifier la publication
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleUpdate} className="p-4">
              <textarea
                className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none text-sm text-slate-700"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                required
              />
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 disabled:opacity-50 transition-all"
                >
                  {isUpdating ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </article>
  );
};

export default Post;
