import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home route: go to login by default */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public routes (visible only when not logged in) */}
        <Route path="/login" element={<PublicRoute element={<LoginForm />} redirectTo="/dashboard" />} />
        <Route path="/signup" element={<PublicRoute element={<SignupForm />} redirectTo="/dashboard" />} />

        {/* Protected route (only accessible when logged in) */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} redirectTo="/login" />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
