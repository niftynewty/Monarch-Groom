import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/config";

const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  const [user, loading] = useAuthState(auth);
  if (loading) return null;
  return user ? children : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
