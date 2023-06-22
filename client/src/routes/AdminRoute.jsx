import React from "react";
import { useRole } from "@/hooks";
import { Navigate } from "react-router-dom";
import { Loader } from "@/components/global";

const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) {
    return <Loader />;
  }
  if (role === "admin") {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default AdminRoute;
