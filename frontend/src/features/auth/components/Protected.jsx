import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../../shared/Loader";

const Protected = ({ children }) => {
  const { user, isAuthChecked } = useSelector((state) => state.authentication);

  // Wait until getMe resolves before making any routing decision
  if (!isAuthChecked) return <Loader />;

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/auth/login" replace />;

  return children;
};

export default Protected;