import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
  TextField,
  Box,
  Card,
  Stack,
  styled,
  LinearProgress,
} from "@mui/material";
import useClasses from "./useClasses";
import { useAxios } from "@/hooks";
import { Toast } from "@/components/global";
import { LoadingButton } from "@mui/lab";

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [classesData, isClassesLoading] = useClasses();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:last-child td, &:last-child th": {
      borderBottom: "none",
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    borderBottom: `1px solid ${theme.palette.divider}`,
  }));

  const [api] = useAxios();
  useEffect(() => {
    fetchClasses();
  }, [classesData]);

  const fetchClasses = () => {
    setClasses(classesData);
  };

  const setStatus = (status, classId) => {
    return api.patch(`/api/class/${classId}`, { status: status });
  };

  const handleApprove = (classId) => {
    setStatus("approved", classId).then((res) => {
      if (res.data.modifiedCount > 0) {
        const updatedClass = classes.map((item) =>
          item._id === classId ? { ...item, status: "approved" } : item
        );
        setClasses(updatedClass);
      }
    });
  };

  const handleDeny = (classId) => {
    setStatus("denied", classId).then((res) => {
      if (res.data.modifiedCount > 0) {
        const updatedClass = classes.map((item) =>
          item._id === classId ? { ...item, status: "denied" } : item
        );
        setClasses(updatedClass);
      }
    });
  };

  const handleSendFeedback = (classId) => {
    setLoading(true);
    api
      .patch(`/api/class/feedback/${classId}`, { feedback })
      .then((res) => {
        setOpen(true);
        setMessage("feedback sent successfully!");
        closeFeedbackModal();
      })
      .catch(() => {
        setOpen(true);
        setMessage("Something went wrong!");
        closeFeedbackModal();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const openFeedbackModal = (classItem) => {
    setSelectedClass(classItem);
    setFeedback("");
    setModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setSelectedClass(null);
    setFeedback("");
    setModalOpen(false);
  };

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
        <title>Dashboard: Manage Classes</title>
      </Helmet>

      <Typography variant="h6" gutterBottom>
        Manage Classes
      </Typography>

      <Toast open={open} onClose={() => setOpen(false)} message={message} />
      <Card sx={{ mt: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Class Image</StyledTableCell>
                <StyledTableCell>Class Name</StyledTableCell>
                <StyledTableCell>Instructor Name</StyledTableCell>
                <StyledTableCell>Instructor Email</StyledTableCell>
                <StyledTableCell>Available Seats</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classes?.length === 0 && (
                <Typography p={3}>No Data available!</Typography>
              )}

              {classes?.map((classItem) => (
                <StyledTableRow key={classItem.class_name}>
                  <TableCell>
                    <Box
                      component="img"
                      src={classItem.class_image}
                      height={50}
                      sx={{
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  </TableCell>
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
                  <TableCell>{classItem.instructor_name}</TableCell>
                  <TableCell>{classItem.instructor_email}</TableCell>
                  <TableCell>{classItem.available_seats}</TableCell>
                  <TableCell>${classItem.price}</TableCell>
                  <TableCell>{classItem.status}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => handleApprove(classItem._id)}
                        disabled={classItem.status !== "pending"}
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => handleDeny(classItem._id)}
                        disabled={classItem.status !== "pending"}
                      >
                        Deny
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        disabled={classItem.status === "pending"}
                        onClick={() => openFeedbackModal(classItem)}
                      >
                        Send Feedback
                      </Button>
                    </Stack>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Modal open={isModalOpen} onClose={closeFeedbackModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 500,
            width: "100%",
            p: 5,
            borderRadius: "5px",
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          <Typography variant="h6" gutterBottom mb={2}>
            Send Feedback
          </Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            label="Feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{
              marginBottom: 2,
            }}
          />

          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <Button variant="outlined" onClick={closeFeedbackModal}>
              Cancel
            </Button>
            <LoadingButton
              loading={loading}
              variant="contained"
              color="primary"
              onClick={() => handleSendFeedback(selectedClass._id)}
            >
              Send
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default ManageClasses;
