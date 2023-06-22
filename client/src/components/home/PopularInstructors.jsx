import React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fade } from "react-awesome-reveal";

const PopularInstructors = () => {
  const { data: popular_instructors } = useQuery({
    queryKey: ["popular_instructors"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/popular-instructors`
      );
      return res.data;
    },
  });
  return (
    <Box
      sx={{
        mt: 10,
      }}
    >
      <Container>
        <Fade direction="down">
          <Stack direction="column" textAlign="center">
            <Typography variant="h3">Popular Instructors</Typography>
            <Typography variant="body2" maxWidth={400} mx="auto">
              Discover acclaimed instructors and unlock your potential with
              their expert guidance. Join their classes today!
            </Typography>
          </Stack>
        </Fade>

        <Grid container spacing={4} mt={5}>
          {popular_instructors &&
            popular_instructors.map((instructor, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <img
                    src={instructor.photoURL}
                    alt={instructor.name}
                    style={{
                      objectFit: "cover",
                      height: 350,
                      borderTopLeftRadius: "4px",
                      borderTopRightRadius: "4px",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body1">
                      Name: {instructor.name}
                    </Typography>
                    <Typography variant="body1">
                      Email: {instructor.email}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PopularInstructors;
