import { useState } from "react";

const DeleteAccountModal = ({
  isOpen,
  onClose,
  onSoftDelete,
  onHardDelete,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async (type) => {
    const confirmText =
      type === "full"
        ? "Êtes-vous ABSOLUMENT sûr ? Cette action supprimera votre profil ET tous vos messages/commentaires de façon permanente."
        : "Voulez-vous supprimer votre profil ? Vos messages resteront visibles sous le nom 'Utilisateur supprimé'.";

    if (!window.confirm(confirmText)) return;

    setLoading(true);
    try {
      if (type === "partial") {
        await onSoftDelete();
      } else {
        await onHardDelete();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 15c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-2">
            Suppression du compte
          </h3>
          <p className="text-slate-500 text-sm mb-6">
            Cette action est irréversible. Choisissez comment vous souhaitez
            quitter le réseau.
          </p>

          <div className="space-y-3">
            {/* OPTION 1 : Suppression partielle */}
            <button
              onClick={() => handleDelete("partial")}
              disabled={loading}
              className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors flex flex-col items-center"
            >
              <span>Supprimer mon profil uniquement</span>
              <span className="text-[10px] font-normal opacity-70">
                Vos publications seront conservées
              </span>
            </button>

            {/* OPTION 2 : Suppression totale */}
            <button
              onClick={() => handleDelete("full")}
              disabled={loading}
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-200 transition-all flex flex-col items-center"
            >
              <span>Tout supprimer</span>
              <span className="text-[10px] font-normal opacity-80">
                Profil + Messages + Commentaires
              </span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="mt-6 text-sm text-slate-400 font-medium hover:text-slate-600 transition-colors"
          >
            Annuler et rester
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
