import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, redirectTo }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? element : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
