import { useState, useEffect } from "react";
import axios from "./api/axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DeleteAccountModal from "./components/ConfirmDeleteModal";

const Profil = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birthdate: "",
    mail: "",
    password: "",
    profil_pic: "",
    profil_pic_url: null,
  });

  const [userId, setUserId] = useState(null);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm bg-slate-50";
  const labelStyle =
    "text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1";

  useEffect(() => {
    axios
      .get("/user")
      .then((res) => {
        setUserId(res.data.id);
        setFormData({
          ...formData,
          first_name: res.data.first_name || "",
          last_name: res.data.last_name || "",
          birthdate: res.data.birthdate || "",
          mail: res.data.mail || "",
          profil_pic: res.data.profil_pic || "",
        });
      })
      .catch((err) => console.error("Erreur chargement profil", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profil_pic: file,
        profil_pic_url: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: "", message: "" });

    const data = new FormData();
    data.append("_method", "PUT");
    data.append("first_name", formData.first_name);
    data.append("last_name", formData.last_name);
    data.append("birthdate", formData.birthdate);
    data.append("mail", formData.mail);

    if (formData.password) {
      data.append("password", formData.password);
    }
    if (formData.profil_pic instanceof File) {
      data.append("profil_pic", formData.profil_pic);
    }

    try {
      await axios.post(`/users/${userId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFeedback({
        type: "success",
        message: "Profil mis à jour avec succès !",
      });
    } catch (err) {
      setFeedback({ type: "error", message: "Erreur lors de la mise à jour." });
    }
  };

  const handleSoftDelete = async () => {
    try {
      await axios.delete(`/users/${userId}`);
      localStorage.removeItem("ACCESS_TOKEN");
      window.location.href = "/Log";
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Impossible de désactiver le compte.",
      });
      setIsDeleteModalOpen(false);
    }
  };

  const handleHardDelete = async () => {
    try {
      await axios.delete(`/users/${userId}/force`);
      localStorage.removeItem("ACCESS_TOKEN");
      window.location.href = "/Log";
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Impossible de supprimer définitivement le compte.",
      });
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="flex-1 flex justify-center items-start p-6 md:p-12">
        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-700"></div>

          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="relative flex flex-col items-center -mt-16 mb-8">
                <div className="relative group">
                  <img
                    src={
                      formData.profil_pic_url
                        ? formData.profil_pic_url
                        : formData.profil_pic
                          ? `http://localhost:8000/storage/${formData.profil_pic}`
                          : `https://ui-avatars.com/api/?name=${formData.first_name}+${formData.last_name}&background=random`
                    }
                    alt="Profil"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white"
                  />
                  <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-white text-xs font-bold">
                      Changer
                    </span>
                    <input
                      type="file"
                      id="profil_pic"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-800 mt-4">
                  {formData.first_name} {formData.last_name}
                </h2>
                <p className="text-slate-500 text-sm">
                  Gérez vos informations personnelles
                </p>
              </div>

              {feedback.message && (
                <div
                  className={`p-4 mb-6 rounded-xl text-sm font-semibold text-center ${
                    feedback.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {feedback.message}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col">
                  <label className={labelStyle}>Prénom</label>
                  <input
                    type="text"
                    placeholder="Prénom"
                    className={inputStyle}
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className={labelStyle}>Nom</label>
                  <input
                    type="text"
                    placeholder="Nom"
                    className={inputStyle}
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col">
                  <label className={labelStyle}>Date de naissance</label>
                  <input
                    type="date"
                    className={inputStyle}
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className={labelStyle}>Email professionnel</label>
                  <input
                    type="email"
                    placeholder="Email"
                    className={inputStyle}
                    name="mail"
                    value={formData.mail}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className={labelStyle}>Mot de passe</label>
                  <input
                    type="password"
                    placeholder="•••••••• (Laisser vide pour ne pas modifier)"
                    className={inputStyle}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                  Enregistrer les modifications
                </button>
                <button
                  type="button"
                  className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all"
                >
                  Annuler
                </button>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="text-red-500 text-sm font-bold hover:bg-red-50 px-6 py-2 rounded-xl transition-all border border-transparent hover:border-red-100"
                >
                  Supprimer mon compte
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSoftDelete={handleSoftDelete}
        onHardDelete={handleHardDelete}
      />
    </div>
  );
};

export default Profil;
