import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);

  // --- DÉCONNEXION ---
  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");

    console.log("Token supprimé, déconnexion en cours...");

    closeMenu();

    navigate("/Log");
  };

  return (
    <nav className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-700 font-bold text-xl"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {isOpen && (
        <ul className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-100 shadow-2xl rounded-2xl py-3 z-50 overflow-hidden">
          <li className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Navigation
          </li>

          {[
            { to: "/Actuality", label: "Fil d'actualité" },
            { to: "/profil", label: "Profil" },
            // { to: "/Groupscreate", label: "Créer un Groupe" },
          ].map((item) => (
            <li key={item.to} className="px-2">
              <Link to={item.to} onClick={closeMenu} className="group">
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium"
                >
                  {item.label}
                </button>
              </Link>
            </li>
          ))}

          <div className="my-2 border-t border-slate-50"></div>

          {/* <li className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Mes Groupes
          </li>

          <li className="px-2">
            <Link to="/Groupsactuality" onClick={closeMenu}>
              <button
                type="button"
                className="w-full text-left px-4 py-2.5 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all font-medium flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Epitech
              </button>
            </Link>
          </li> */}

          <div className="my-2 border-t border-slate-100"></div>

          <li className="px-2">
            <button
              onClick={handleLogout}
              type="button"
              className="w-full text-left px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 font-medium flex items-center gap-2"
            >
              Déconnexion
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default BurgerMenu;
