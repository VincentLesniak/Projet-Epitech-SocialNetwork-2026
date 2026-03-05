import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import api from "./api/axios";
import { useNotification } from "./components/NotificationContext";

const AuthManager = () => {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [mode, setMode] = useState("login");

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm bg-slate-50";
  const btnPrimary =
    "w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-2";
  const btnLink =
    "text-sm text-slate-500 hover:text-blue-600 transition-colors mt-2";

  // --- CONNEXION ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/login", { mail, password });

      if (response.data.token) {
        localStorage.setItem("ACCESS_TOKEN", response.data.token);
        notify("Bienvenue sur Connect'In!");
        navigate("/actuality");
      }
    } catch (err) {
      setError("Identifiants incorrects.");
      console.error(err);
    }
  };

  // --- INSCRIPTION ---
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await api.post("/register", {
        first_name: firstName,
        last_name: lastName,
        birthdate: birthdate,
        mail: mail,
        password: password,
        password_confirmation: passwordConfirmation,
      });

      if (response.data.token) {
        setMode("login");
        notify("Inscription réussie ! Connectez-vous maintenant.");
      }
    } catch (err) {
      if (err.response && err.response.status === 422) {
        const errorMessages = Object.values(err.response.data.errors).flat();
        setError(errorMessages[0]);
      } else {
        notify("Inscription échouée ! Veuillez réessayer.");
        setError("Une erreur est survenue lors de l'inscription.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="p-8 flex justify-center">
        <h1 className="select-none tracking-tight">
          <span className="text-slate-800 font-extrabold text-2xl transition-colors group-hover:text-blue-600">
            Connect
          </span>
          <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded-md text-xl font-bold transition-transform group-hover:scale-105">
            in
          </span>
        </h1>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
          {mode === "login" ? (
            /* FORMULAIRE DE CONNEXION */
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-extrabold text-slate-800">
                  Bon retour !
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Connectez-vous pour voir les nouveautés.
                </p>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
                  {error}
                </p>
              )}

              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Adresse mail"
                  className={inputStyle}
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  className={inputStyle}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className={btnPrimary}>
                Connexion
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setError("");
                }}
                className={btnLink}
              >
                Pas encore de compte ?{" "}
                <span className="text-blue-600 font-semibold">S'inscrire</span>
              </button>
            </form>
          ) : (
            /* FORMULAIRE D'INSCRIPTION */
            <form
              onSubmit={handleRegisterSubmit}
              className="flex flex-col gap-4"
            >
              <div className="text-center mb-4">
                <h2 className="text-2xl font-extrabold text-slate-800">
                  Créer un compte
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Rejoignez-nous dès aujourd'hui !
                </p>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
                  {error}
                </p>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Prénom"
                  className={inputStyle}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Nom"
                  className={inputStyle}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <input
                type="date"
                className={inputStyle}
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Adresse mail"
                className={inputStyle}
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                required
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="password"
                  placeholder="Mot de passe"
                  className={inputStyle}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Confirmation"
                  className={inputStyle}
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className={btnPrimary}>
                S'inscrire
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
                className={btnLink}
              >
                Déjà un compte ?{" "}
                <span className="text-blue-600 font-semibold">
                  Se connecter
                </span>
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthManager;
