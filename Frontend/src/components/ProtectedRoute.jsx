import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = token !== null && token !== "undefined"; // Ensure token is valid

  console.log("isAuthenticated:", isAuthenticated); // Debugging log

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
