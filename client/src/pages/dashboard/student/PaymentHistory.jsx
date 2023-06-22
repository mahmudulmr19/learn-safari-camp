import React from "react";
import { Helmet } from "react-helmet-async";
import { useAuth, useAxios } from "@/hooks";
import {
  Box,
  Container,
  LinearProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import moment from "moment/moment";

const PaymentHistory = () => {
  const { currentUser } = useAuth();
  const [api] = useAxios();

  // Fetch the payment_history  data
  const { data: payment_history, isLoading } = useQuery({
    queryKey: ["enrolled_classes", currentUser?.email],
    queryFn: async () => {
      const res = await api.get("/api/student/payment_history");
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
        <title>Dashboard: Payment History</title>
      </Helmet>

      <Container>
        <Typography variant="h6">Payment History</Typography>

        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Class</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payment_history?.length === 0 && (
                <Typography variant="body1">
                  No payment history available.
                </Typography>
              )}
              {payment_history.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>{payment.class_name}</TableCell>
                  <TableCell>${payment.price}</TableCell>
                  <TableCell>{payment.transactionId}</TableCell>
                  <TableCell>
                    {moment(payment.date).format("MMMM Do YYYY, h:mm:ss a")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default PaymentHistory;
