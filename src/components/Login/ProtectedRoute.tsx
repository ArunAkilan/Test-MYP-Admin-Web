import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

const isTokenValid = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now(); // Convert to ms
    return !isExpired;
  } catch (error) {
    // Token is malformed or tampered
    return false;
  }
};

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = isTokenValid();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;


/*
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

export default ProtectedRoute; */