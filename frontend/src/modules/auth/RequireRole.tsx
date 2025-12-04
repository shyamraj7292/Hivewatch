import React from "react";
import { Navigate } from "react-router-dom";
import { Role, useAuth } from "./AuthContext";

export const RequireRole: React.FC<{ role: Role; children: JSX.Element }> = ({
  role,
  children
}) => {
  const { auth } = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  if (auth.user.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};


