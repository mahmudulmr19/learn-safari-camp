import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Container,
  LinearProgress,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { useAuth, useAxios } from "@/hooks";
import { useQuery } from "@tanstack/react-query";

const MyEnrolledClasses = () => {
  const { currentUser } = useAuth();
  const [api] = useAxios();

  // Fetch the enrolled classes data
  const { data: enrolledClasses, isLoading } = useQuery({
    queryKey: ["enrolled_classes", currentUser?.email],
    queryFn: async () => {
      const res = await api.get("/api/student/enrolled_class");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Box
          sx={{
            width: "20%",
          }}
        >
          <LinearProgress
            color="primary"
            sx={{
              borderRadius: "4px",
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard: My Enrolled Classes</title>
      </Helmet>

      <Container>
        <Typography variant="h6">My Enrolled Classes</Typography>
        <Grid container spacing={2} mt={2}>
          {enrolledClasses.length === 0 && (
            <Typography variant="body1">You did not enrolled yet!.</Typography>
          )}
          {enrolledClasses.map((enrolledClass) => (
            <Grid item xs={12} sm={6} md={4} key={enrolledClass._id}>
              <Card>
                <CardMedia
                  component="img"
                  src={enrolledClass.class_image}
                  alt={enrolledClass.class_name}
                  height="140"
                />
                <CardContent>
                  <Typography variant="subtitle1">
                    {enrolledClass.class_name}
                  </Typography>
                  <Typography variant="body1">
                    Instructor: {enrolledClass.instructor_name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default MyEnrolledClasses;
