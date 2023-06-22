import React from "react";
import logo from "@/assets/global/logo.svg";
import { useNavigate } from "react-router-dom";
const Logo = () => {
  const navigate = useNavigate();
  return (
    <img
      src={logo}
      height={40}
      onClick={() => navigate("/")}
      style={{
        cursor: "pointer",
      }}
    />
  );
};

export default Logo;
