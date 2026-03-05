import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Addpost from "./components/Addpost";
import Post from "./components/Post";
import Addgroupmember from "./components/Addgroupmember";

const Groupsactuality = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      content:
        "Bienvenue dans le groupe Epitech ! Ici on partage nos ressources.",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const primaryBtnClass =
    "bg-blue-600 text-white font-medium py-2 px-5 rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
  const dangerBtnClass =
    "bg-white border border-gray-300 text-gray-700 font-medium py-2 px-5 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-3xl mx-auto pb-12">
        <div className="relative h-48 md:h-64 overflow-hidden rounded-b-3xl shadow-lg">
          <img
            src="https://placehold.co/800x400"
            alt="Bannière de groupe"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
        </div>

        <div className="px-4 -mt-12 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-800">
                  Epitech Promo 2026
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  Groupe privé • 42 membres
                </p>
              </div>

              <div className="flex gap-2">
                <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                  Modifier
                </button>
                <button className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                  Quitter
                </button>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6 border-l-4 border-blue-500 pl-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              facere possimus rem ipsa sint quidem? Officiis, laborum in! Harum
              libero quidem placeat hic eveniet iusto doloremque.
            </p>

            <button
              onClick={() => setIsOpen(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
            >
              + Inviter des membres
            </button>
          </div>
        </div>

        {isOpen && <Addgroupmember onClose={() => setIsOpen(false)} />}

        <div className="mt-8 px-4">
          <div className="mb-6 flex items-center gap-4 text-slate-400">
            <div className="h-px flex-1 bg-slate-200"></div>
            <span className="text-xs uppercase font-bold tracking-widest">
              Discussions
            </span>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          <Addpost />

          <div className="space-y-6">
            {posts.map((post) => (
              <Post key={post.id} data={post} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Groupsactuality;
