import Header from "./components/Header";
import Footer from "./components/Footer";

const Profil = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center">
        <h2>Mon profil</h2>
        <form
          action="profil"
          className="flex flex-col justify-center items-center gap-4"
        >
          <input type="image" />
          <input type="text" placeholder="Prénom" />
          <input type="text" placeholder="Nom" />
          <input type="date" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Mot de passe" />
          <button type="submit">Valider modification</button>
        </form>
        <div className="flex flex-row justify-center">
          <button>Modifier le profil</button>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Profil;
