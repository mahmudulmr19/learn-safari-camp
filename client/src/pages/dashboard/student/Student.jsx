import React from "react";
import { Container, Typography } from "@mui/material";
import { useAuth } from "@/hooks";
import { Helmet } from "react-helmet-async";

const Student = () => {
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

export default Student;
