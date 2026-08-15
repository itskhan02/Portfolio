import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ADMIN_LOGIN_PATH } from "../config/admin";

const ProtectedRoute = ({ children }) => {
  const { admin, checking } = useAuth();

  if (checking) return <main className="admin-shell">Checking session...</main>;
  if (!admin) return <Navigate to={ADMIN_LOGIN_PATH} replace />;

  return children;
};

export default ProtectedRoute;
