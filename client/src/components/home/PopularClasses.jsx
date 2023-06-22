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
const PopularClasses = () => {
  const { data: popular_classes } = useQuery({
    queryKey: ["popular_classes"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/popular-classes`
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
            <Typography variant="h3">Popular Classes</Typography>
            <Typography variant="body2" maxWidth={400} mx="auto">
              Join our popular classes for an immersive learning experience and
              skill enhancement. Connect with like-minded individuals and unlock
              your potential today.
            </Typography>
          </Stack>
        </Fade>
        <Grid container spacing={4} mt={5}>
          {popular_classes &&
            popular_classes.map((classItem) => (
              <Grid item xs={12} sm={6} md={4} key={classItem._id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <img
                    src={classItem.class_image}
                    alt={classItem.class_name}
                    style={{
                      objectFit: "cover",
                      height: 200,
                      borderTopLeftRadius: "4px",
                      borderTopRightRadius: "4px",
                    }}
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{classItem.class_name}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Instructor: {classItem.instructor_name}
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

export default PopularClasses;
