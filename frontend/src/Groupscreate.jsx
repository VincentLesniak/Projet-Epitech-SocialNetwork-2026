import Header from "./components/Header";
import Footer from "./components/Footer";

const Groupscreate = () => {
  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white text-gray-800";
  const primaryBtnClass =
    "w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-2";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <div className="bg-blue-600 p-8 text-center text-white">
            <h2 className="text-2xl font-bold">Créer un nouveau groupe</h2>
            <p className="text-blue-100 text-sm mt-2">
              Rassemblez vos collègues autour d'un projet ou d'un centre
              d'intérêt.
            </p>
          </div>

          <form action="groupscreate" className="p-8 flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                Nom du groupe
              </label>
              <input
                type="text"
                placeholder="Ex: Équipe Design, Projet X..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                Photo de couverture
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center hover:bg-slate-50 hover:border-blue-300 transition-all cursor-pointer group">
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  🖼️
                </span>
                <p className="text-sm text-slate-500 font-medium">
                  Cliquez pour choisir une image
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  PNG, JPG jusqu'à 5Mo
                </p>
                <input type="file" className="hidden" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                Description
              </label>
              <textarea
                rows="3"
                placeholder="Décrivez l'objectif de ce groupe..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
            >
              Créer le groupe
            </button>

            <p className="text-center text-[11px] text-slate-400 px-4">
              En créant ce groupe, vous acceptez les règles de courtoisie et de
              confidentialité de Connect'in.
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Groupscreate;
