import React from "react";
import { Header, Footer } from "@/components/global";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ScrollToTop } from "@/hooks";

const Main = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Box mt={10} />
      <Outlet />
      <Box mt={10} />
      <Footer />
    </>
  );
};

export default Main;
