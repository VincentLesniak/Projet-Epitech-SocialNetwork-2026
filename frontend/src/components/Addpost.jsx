import { useState } from "react";
import axios from "../api/axios";

const Addpost = ({ onPostCreated, user }) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fullName = user
    ? `${user.first_name} ${user.last_name}`
    : "Chargement...";

  const avatarUrl = user?.profil_pic
    ? `http://localhost:8000/storage/${user.profil_pic}`
    : `https://ui-avatars.com/api/?name=${fullName}&background=random`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post("/posts", {
        message: message,
        group_id: null,
      });

      if (onPostCreated) {
        const newPost = {
          ...response.data.data,
          user: user,
          likers_count: 0,
          comments: [],
        };
        onPostCreated(newPost);
      }
      setMessage("");
    } catch (error) {
      console.error("Erreur détails:", error.response?.data);
      notify("Erreur lors de la publication.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 mb-8">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={avatarUrl}
          alt={`Photo de ${fullName}`}
          className="w-10 h-10 rounded-full border border-slate-100 object-cover"
        />
        <p className="font-bold text-slate-800 text-sm">{fullName}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="relative">
          <textarea
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Quoi de neuf ?"
            className="w-full p-3 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-row justify-end mt-3 pt-3 border-t border-slate-50">
          <button
            type="submit"
            disabled={isSubmitting || !message.trim()}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all shadow-md active:scale-95 ${
              isSubmitting || !message.trim()
                ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
            }`}
          >
            {isSubmitting ? "Publication..." : "Publier"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addpost;
