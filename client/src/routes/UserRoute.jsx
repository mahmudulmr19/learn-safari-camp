import React from "react";
import { useAuth } from "@/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { Loader } from "@/components/global";

const UserRoute = ({ children }) => {
  const { loading, currentUser } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (currentUser) {
    return children;
  }

  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default UserRoute;
