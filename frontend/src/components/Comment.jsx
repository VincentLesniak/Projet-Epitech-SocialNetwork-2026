import { useState } from "react";
import axios from "../api/axios";

const Comment = ({ data, currentUser, onDeleteSuccess }) => {
  const { message, created_at, user, id } = data;

  const [isEditing, setIsEditing] = useState(false);
  const [commentContent, setCommentContent] = useState(message);
  const [isUpdating, setIsUpdating] = useState(false);

  const isAuthor = currentUser && user && currentUser.id === user.id;

  const fullName = user
    ? `${user.first_name} ${user.last_name}`
    : "Utilisateur inconnu";

  const avatarUrl = user?.profil_pic
    ? `http://localhost:8000/storage/${user.profil_pic}`
    : `https://ui-avatars.com/api/?name=${fullName}&background=random`;

  const timeFormatted = new Date(created_at).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleDelete = async () => {
    if (window.confirm("Supprimer ce commentaire ?")) {
      try {
        await axios.delete(`/comments/${id}`);
        if (onDeleteSuccess) onDeleteSuccess(id);
      } catch (error) {
        console.error("Erreur suppression commentaire :", error);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await axios.put(`/comments/${id}`, { message: commentContent });
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur modification commentaire :", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex gap-3 mt-3 animate-in fade-in duration-300">
      <img
        src={avatarUrl}
        alt={fullName}
        className="w-8 h-8 rounded-full border border-slate-100 object-cover flex-shrink-0"
      />

      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <div className="flex-1 bg-slate-100/80 rounded-2xl rounded-tl-none px-4 py-2 shadow-sm">
            <div className="flex justify-between items-center mb-0.5">
              <p className="font-bold text-slate-800 text-[11px] hover:underline cursor-pointer">
                {fullName}
              </p>
              <span className="text-[10px] text-slate-400 font-medium">
                {timeFormatted}
              </span>
            </div>

            {isEditing ? (
              <form onSubmit={handleUpdate} className="py-2">
                <textarea
                  className="w-full p-2 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  autoFocus
                  required
                />
                <div className="flex justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setCommentContent(message);
                    }}
                    className="text-[10px] font-bold text-slate-500 hover:text-slate-700"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="text-[10px] font-bold text-blue-600 hover:text-blue-800 disabled:opacity-50"
                  >
                    {isUpdating ? "Enregistrement..." : "Enregistrer"}
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-slate-700 text-sm leading-snug break-words pb-1">
                {commentContent}
              </p>
            )}
          </div>

          {isAuthor && !isEditing && (
            <div className="flex flex-col gap-1 self-center">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                title="Modifier"
              >
                <svg
                  className="w-3.5 h-3.5"
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
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                title="Supprimer"
              >
                <svg
                  className="w-3.5 h-3.5"
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
      </div>
    </div>
  );
};

export default Comment;
