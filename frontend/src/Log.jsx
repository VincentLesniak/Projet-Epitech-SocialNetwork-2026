import { useState } from "react";
import Title from "./components/Title";
import Footer from "./components/Footer";

const AuthManager = () => {
  const [mode, setMode] = useState("login");

  return (
    <>
      <Title />
      <div>
        {mode === "login" ? (
          <form className="flex flex-col justify-center items-center gap-4">
            <h2>Connexion</h2>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Mot de passe" />
            <button type="submit">Login</button>
            <button type="button" onClick={() => setMode("register")}>
              Pas de compte? S'inscrire!
            </button>
            <button type="button" onClick={() => setMode("forgot")}>
              Mot de passe oublié?
            </button>
          </form>
        ) : mode === "forgot" ? (
          <form className="flex flex-col justify-center items-center gap-4">
            <h2>Récupération</h2>
            <input type="text" placeholder="Email" />
            <input type="date" />
            <button type="submit">Recevoir son mot de passe</button>
            <button type="button" onClick={() => setMode("login")}>
              Retour à la connexion
            </button>
          </form>
        ) : (
          <form className="flex flex-col justify-center items-center gap-4">
            <h2>Inscription</h2>
            <input type="text" placeholder="Firstname" />
            <input type="text" placeholder="Lastname" />
            <input type="date" />
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Mot de passe" />
            <button type="submit">S'inscrire</button>
            <button type="button" onClick={() => setMode("login")}>
              Déjà un compte? Se connecter!
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AuthManager;
