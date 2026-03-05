import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Log from "./Log";
import Profil from "./Profil";
import Groupscreate from "./Groupscreate";
import Actuality from "./Actuality";
import Groupsactuality from "./Groupsactuality";
import ProtectedRoute from "./components/ProtectedRoute";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <div className="antialiased text-slate-900 font-sans">
      <ScrollToTop />
      {/* Routes public */}

      <Routes>
        <Route path="/" element={<Log />} />
        <Route path="/Log" element={<Log />} />

        {/* Routes protégées */}
        <Route
          path="/Profil"
          element={
            <ProtectedRoute>
              <Profil />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Groupscreate"
          element={
            <ProtectedRoute>
              <Groupscreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Actuality"
          element={
            <ProtectedRoute>
              <Actuality />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Groupsactuality"
          element={
            <ProtectedRoute>
              <Groupsactuality />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
