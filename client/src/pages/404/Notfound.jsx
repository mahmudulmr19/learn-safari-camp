import { Box, Button, Container, Typography, styled } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import errorImage from "@/assets/global/404.svg";
const Notfound = () => {
  const StyledContent = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(12, 0),
  }));
  return (
    <>
      <Helmet>
        <title> 404 Not Found | Learn Safari Camp </title>
      </Helmet>
      <Container>
        <StyledContent sx={{ textAlign: "center", alignItems: "center" }}>
          <Typography variant="h3" paragraph textTransform="capitalize">
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </Typography>

          <Box
            component="img"
            src={errorImage}
            sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" variant="contained" component={Link}>
            Go to Home
          </Button>
        </StyledContent>
      </Container>
    </>
  );
};

export default Notfound;
