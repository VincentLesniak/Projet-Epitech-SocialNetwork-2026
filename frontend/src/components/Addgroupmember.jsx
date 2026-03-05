const Addgroupmember = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="flex flex-row justify-between items-center p-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">Ajouter des membres</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-4 bg-slate-50">
          <input
            type="text"
            placeholder="Rechercher un collègue..."
            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all"
          />
        </div>

        <ul className="flex-1 overflow-y-auto p-2">
          {[1, 2, 3].map((i) => (
            <li
              key={i}
              className="flex flex-row items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://placehold.co/40"
                  alt="Profil"
                  className="w-10 h-10 rounded-full border border-slate-100"
                />
                <p className="text-sm font-medium text-slate-700">
                  Nom d'utilisateur
                </p>
              </div>
              <button className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all">
                Ajouter
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Addgroupmember;
