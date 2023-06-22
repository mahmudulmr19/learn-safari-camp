import React from "react";
import { Box, Container, Grid, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  const FooterLink = styled(Link)(({ theme }) => ({
    color: theme.palette.text.primary,
    display: "block",
  }));
  return (
    <Box component="footer" py={5}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Logo />
              <Typography variant="body2">
                Explore. Create. Thrive. Join Learn Safari Camp's summer Art &
                Craft School and unleash your creativity!
              </Typography>
              <Typography variant="body2" color="textSecondary">
                © {new Date().getFullYear()} Learn Safari Camp. All rights
                reserved.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="h6">Contact Info</Typography>
              <Typography variant="body2">
                Email: info@learnsafaricamp.com
              </Typography>
              <Typography variant="body2">Phone: 123-456-7890</Typography>
              <Typography variant="body2">
                Address: Rangpur, Bangladesh
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="h6">Useful Links</Typography>
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/instructors">Instructors</FooterLink>
              <FooterLink to="/classes">Classes</FooterLink>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="h6">Social</Typography>
              <Typography variant="body2">Facebook</Typography>
              <Typography variant="body2">Twitter</Typography>
              <Typography variant="body2">Instagram</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
