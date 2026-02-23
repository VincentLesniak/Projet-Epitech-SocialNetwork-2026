import Header from "./components/Header";
import Footer from "./components/Footer";

const Groupscreate = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center">
        <h2>Créer un groupe</h2>
        <form action="groupscreate" className="flex flex-col gap-4">
          <input type="text" placeholder="Nom du groupe" />
          <input type="image" />
          <input type="text" placeholder="Description" />
          <button type="submit">Créer le groupe</button>
        </form>
      </main>
      <Footer />
    </>
  );
};
export default Groupscreate;
