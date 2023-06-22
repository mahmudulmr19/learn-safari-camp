import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Card,
  Container,
  IconButton,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { useAxios, useSelectedClass } from "@/hooks";
import { Toast } from "@/components/global";
import { Delete, Payment } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const MySelectedClasses = () => {
  const [api] = useAxios();
  const [selectedClass, selectedClassLoading, refetch] = useSelectedClass();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    api
      .delete(`/api/select_class/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          setOpen(true);
          setMessage("Deleted Successfully!");
          refetch();
        }
      })
      .catch((err) => {
        setOpen(true);
        setMessage("Something went wrong!");
      });
  };

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (selectedClassLoading) {
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

  const indexOfLastClass = (page + 1) * rowsPerPage;
  const indexOfFirstClass = indexOfLastClass - rowsPerPage;
  // prettier-ignore
  const filteredClass = selectedClass?.slice(indexOfFirstClass,indexOfLastClass);

  return (
    <>
      <Helmet>
        <title>Dashboard: My Selected Class</title>
      </Helmet>

      <Toast open={open} onClose={() => setOpen(false)} message={message} />
      <Container>
        <Typography variant="h6">My Selected Class</Typography>

        <Card sx={{ mt: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>Image</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>Instructor</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableHead>
              <TableBody>
                {selectedClass?.length === 0 && (
                  <Typography p={3}>
                    No classes selected.{" "}
                    <Box
                      component={Link}
                      to="/classes"
                      sx={{
                        color: (theme) => theme.palette.primary.main,
                        textDecoration: "underline",
                      }}
                    >
                      select class
                    </Box>
                  </Typography>
                )}
                {filteredClass?.map((item, index) => (
                  <StyledTableRow key={item._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Box
                        component="img"
                        src={item.class_image}
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
                      {item?.class_name}
                    </TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>{item.instructor_name}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(item._id)}
                        >
                          <Delete />
                        </IconButton>

                        <IconButton
                          size="small"
                          onClick={() =>
                            navigate(
                              `/student_dashboard/payment/${item.classId}`
                            )
                          }
                        >
                          <Payment />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={selectedClass?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Card>
      </Container>
    </>
  );
};

export default MySelectedClasses;
