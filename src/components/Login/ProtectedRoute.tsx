// components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Simulate a token check. Replace this with actual token validation logic.
const isTokenValid = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token; // add real validation if needed (e.g. decode & check expiry)
};

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = isTokenValid();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
