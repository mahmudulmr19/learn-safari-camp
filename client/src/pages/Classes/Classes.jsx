import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import axios from "axios";
import { useAuth, useAxios, useRole } from "@/hooks";
import { Toast } from "@/components/global";

const Classes = () => {
  const [classesData, setClassesData] = useState([]);
  const [role] = useRole();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [api] = useAxios();
  const { currentUser } = useAuth();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASEURL}/api/classes`).then((res) => {
      setClassesData(res.data);
    });
  }, []);

  const handleSelectClass = (classItem) => {
    if (!currentUser) {
      setOpen(true);
      setMessage("Log in before selecting the class");
      return;
    }

    api
      .post("/api/select_class", {
        email: currentUser?.email,
        classId: classItem._id,
        instructor_name: classItem.instructor_name,
        class_name: classItem.class_name,
        class_image: classItem.class_image,
        price: classItem.price,
      })
      .then((res) => {
        if (res.data.insertedId) {
          setOpen(true);
          setMessage("class select successfully!");
        }
      })
      .catch((err) => {
        if (err.response.data.message === "Already selected") {
          setOpen(true);
          setMessage("You have already selected this class");
        } else {
          setOpen(true);
          setMessage("Something went wrong!");
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Classes - Learn Safari Camp</title>
      </Helmet>

      <Container sx={{ mt: 13 }}>
        <Typography variant="h6">Classes</Typography>

        <Toast open={open} onClose={() => setOpen(false)} message={message} />

        <Grid container spacing={3} sx={{ mt: 3 }}>
          {classesData.map((classItem) => (
            <Grid item xs={12} sm={6} md={4} key={classItem._id}>
              <Card
                sx={{
                  backgroundColor:
                    classItem.available_seats === 0 ? "#dc2626" : "inherit",
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
                <CardContent sx={{ display: "flex" }}>
                  <div>
                    <Typography variant="h6">{classItem.class_name}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Instructor: {classItem.instructor_name}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Available Seats: {classItem.available_seats}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Price: ${classItem.price}
                    </Typography>
                  </div>

                  <Button
                    variant="contained"
                    color="primary"
                    disabled={
                      classItem.available_seats === 0 ||
                      role === "admin" ||
                      role === "instructor"
                    }
                    onClick={() => handleSelectClass(classItem)}
                    sx={{ mt: "auto" }}
                  >
                    Select
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Classes;
