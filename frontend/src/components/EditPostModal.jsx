import { useState } from "react";
import axios from "../api/axios";

const EditPostModal = ({ post, onClose, onUpdate }) => {
  const [message, setMessage] = useState(post.message);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`/posts/${post.id}`, { message });
      onUpdate(message);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      notify("Erreur lors de la modification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-800">
            Modifier votre publication
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleUpdate} className="p-4">
          <textarea
            className="w-full h-40 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none text-slate-700"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <div className="mt-4 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-100 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md shadow-blue-200 disabled:opacity-50"
            >
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
