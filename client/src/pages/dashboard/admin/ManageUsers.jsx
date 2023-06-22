import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Card,
  Container,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  styled,
  Avatar,
  CircularProgress,
  Button,
  LinearProgress,
  Box,
} from "@mui/material";
import { useAuth, useAxios, useUsers } from "@/hooks";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    borderBottom: "none",
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ManageUsers = () => {
  const { currentUser } = useAuth();
  const [api] = useAxios();
  const [usersData, isUsersLoading] = useUsers();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setUsers(usersData);
  }, [usersData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const useRole = (userId, role) => {
    return api.patch(`/api/users/${userId}`, { role });
  };

  const makeInstructor = (userId) => {
    useRole(userId, "instructor").then((res) => {
      if (res.data.modifiedCount > 0) {
        const updatedUsers = users.map((user) =>
          user._id === userId ? { ...user, role: "instructor" } : user
        );
        setUsers(updatedUsers);
      }
    });
  };

  const makeAdmin = (userId) => {
    useRole(userId, "admin").then((res) => {
      if (res.data.modifiedCount > 0) {
        const updatedUsers = users.map((user) =>
          user._id === userId ? { ...user, role: "admin" } : user
        );
        setUsers(updatedUsers);
      }
    });
  };

  const indexOfLastUser = (page + 1) * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const filteredUsers = users?.slice(indexOfFirstUser, indexOfLastUser);

  if (isUsersLoading) {
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
        <title>Dashboard: Manage Users</title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Manage Users
          </Typography>
        </Stack>

        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Role</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers?.map((user, index) => (
                  <StyledTableRow key={user._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <Avatar
                          src={user.photoURL}
                          alt={user.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                        <span style={{ marginLeft: "10px" }}>{user.name}</span>
                      </div>
                    </TableCell>

                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={
                          user.role === "instructor" ||
                          user.email === currentUser.email
                        }
                        onClick={() => makeInstructor(user._id)}
                      >
                        Make Instructor
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={user.role === "admin"}
                        onClick={() => makeAdmin(user._id)}
                        style={{ marginLeft: "10px" }}
                      >
                        Make Admin
                      </Button>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users?.length}
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

export default ManageUsers;
