import { Navigate } from "react-router-dom";

const PublicRoute = ({ element, redirectTo }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return !isAuthenticated ? element : <Navigate to={redirectTo} replace />;
};

export default PublicRoute;
