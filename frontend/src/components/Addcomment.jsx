import { useState } from "react";
import axios from "../api/axios";

const Addcomment = ({ postId, onCommentAdded, user }) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fullName = user
    ? `${user.first_name} ${user.last_name}`
    : "Utilisateur";

  const avatarUrl = user?.profil_pic
    ? `http://localhost:8000/storage/${user.profil_pic}`
    : `https://ui-avatars.com/api/?name=${fullName}&background=random`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post("/comments", {
        message: message,
        post_id: postId,
      });

      setMessage("");

      if (onCommentAdded) {
        const newComment = {
          ...response.data.data,
          user: user,
        };
        onCommentAdded(newComment);
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi du commentaire :",
        error.response?.data,
      );
      alert("Impossible d'envoyer le commentaire.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-start gap-3 mt-2">
      <img
        src={avatarUrl}
        alt={`Photo de ${fullName}`}
        className="w-8 h-8 rounded-full border border-slate-100 object-cover mt-1"
      />

      <div className="flex-1 flex items-center gap-2 bg-slate-100 rounded-2xl px-3 py-1">
        <textarea
          rows="1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrivez un commentaire..."
          className="flex-1 py-2 bg-transparent border-none text-sm text-slate-800 placeholder:text-slate-500 focus:ring-0 transition-all resize-none overflow-hidden"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />

        <button
          type="submit"
          disabled={!message.trim() || isSubmitting}
          className={`p-1.5 rounded-full transition-colors flex-shrink-0 ${
            !message.trim() || isSubmitting
              ? "text-slate-300"
              : "text-blue-600 hover:bg-blue-200/50"
          }`}
        >
          <svg
            className="w-5 h-5 rotate-45"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default Addcomment;
