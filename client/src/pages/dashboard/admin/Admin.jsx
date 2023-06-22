import React from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks";
import { Container, Typography } from "@mui/material";

const Admin = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <Helmet>
        <title>Dashboard - Learn Safari Camp</title>
      </Helmet>

      <Container>
        <Typography variant="h5">
          Hi, Welcome back {currentUser?.displayName}!
        </Typography>
      </Container>
    </>
  );
};

export default Admin;
