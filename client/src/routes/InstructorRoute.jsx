import React from "react";
import { useRole } from "@/hooks";
import { Navigate } from "react-router-dom";
import { Loader } from "@/components/global";

const InstructorRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) {
    return <Loader />;
  }
  if (role === "instructor") {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default InstructorRoute;
