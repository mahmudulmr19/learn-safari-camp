import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Container,
  useTheme,
} from "@mui/material";
import { Fade } from "react-awesome-reveal";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const theme = useTheme();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <Container sx={{ mt: 10 }}>
      <Fade direction="down">
        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Subscribe to Our Newsletter
          </Typography>
          <Typography variant="body2" align="center" mb={2}>
            Stay up to date with our latest news, offers, and updates.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubscribe}
            sx={{
              display: "grid",
              width: "100%",
              gap: 2,
              [theme.breakpoints.up("md")]: {
                gridTemplateColumns: "1fr auto",
                width: "auto",
              },
            }}
          >
            <TextField
              label="Your Email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              sx={{ minWidth: "300px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubscribe}
              sx={{
                py: 1.8,
                px: 3,
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Fade>
    </Container>
  );
};

export default Newsletter;
