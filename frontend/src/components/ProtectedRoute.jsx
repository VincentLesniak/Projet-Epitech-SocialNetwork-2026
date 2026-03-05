import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("ACCESS_TOKEN");

  if (!token) {
    return <Navigate to="/Log" replace />;
  }

  return children;
};

export default ProtectedRoute;
