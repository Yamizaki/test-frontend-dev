import React from "react";
import { Navigate } from 'react-router-dom'
import { authStore } from "../../auth/store/auth-store";

export const PrivateRoute = ({ children }) => {
  const { userToken } = authStore();
  console.log(userToken);
  
  if (!userToken) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>;
};
