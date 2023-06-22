import React, { useEffect, useState } from "react";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const Instructors = () => {
  const [instructorData, setInstructorData] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASEURL}/api/instructors`).then((res) => {
      setInstructorData(res.data);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Instructors - Learn Safari Camp</title>
      </Helmet>

      <Container sx={{ mt: 13 }}>
        <Typography variant="h6">Instructors</Typography>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          {instructorData.map((instructor) => (
            <Grid item xs={12} sm={6} md={4} key={instructor._id}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <img
                  src={instructor.photoURL}
                  alt={instructor.name}
                  style={{ objectFit: "cover", height: 350 }}
                />
                <CardContent>
                  <Typography variant="h6">{instructor.name}</Typography>
                  <Typography variant="body2">
                    Email: {instructor.email}
                  </Typography>
                  {instructor.numClasses && (
                    <Typography variant="body2">
                      Number of Classes: {instructor.numClasses}
                    </Typography>
                  )}
                  {instructor.classNames && (
                    <Typography variant="body2">
                      Classes: {instructor.classNames.join(", ")}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Instructors;
