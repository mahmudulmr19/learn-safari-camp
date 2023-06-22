import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Container,
  Card,
  Badge,
  Box,
  LinearProgress,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useClasses } from "@/hooks";

const MyClasses = () => {
  const [classes, setClasses] = useState([]);
  const [classesData, isClassesLoading] = useClasses();
  const navigate = useNavigate();

  useEffect(() => {
    setClasses(classesData);
  }, [classesData]);

  if (isClassesLoading) {
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
        <title>Dashboard: My Classes</title>
      </Helmet>

      <Container>
        <Typography variant="h6" gutterBottom>
          My Classes
        </Typography>

        <Card sx={{ mt: 5 }}>
          <TableContainer sx={{}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Class Name</TableCell>
                  <TableCell>Total Enrolled Students</TableCell>
                  <TableCell>Feedback</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Update</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classes?.length === 0 && (
                  <Typography p={3}>No class added yet!</Typography>
                )}
                {classes?.map((classItem) => (
                  <TableRow key={classItem._id}>
                    <TableCell
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "150px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {classItem?.class_name}
                    </TableCell>
                    <TableCell>{classItem?.total_enrolled_students}</TableCell>
                    <TableCell>
                      {classItem?.status === "denied"
                        ? classItem?.feedback
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge>{classItem?.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          navigate(
                            `/instructor_dashboard/edit_class/${classItem._id}`
                          )
                        }
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
};

export default MyClasses;
