import React from "react";
import { Helmet } from "react-helmet-async";
import { useAuth, useAxios } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK_KEY);

const Payment = () => {
  const [api] = useAxios();
  const { currentUser } = useAuth();
  const { id } = useParams();

  const { data: select_class, isLoading: selectClassLoading } = useQuery({
    queryKey: ["select_class", currentUser?.email],
    queryFn: async () => {
      const res = await api.get(`/api/selected_class/${id}`);
      return res.data;
    },
  });

  if (selectClassLoading) {
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
        <title>Dashboard: Payment</title>
      </Helmet>

      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Card sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box width="100%">
                <CardContent>
                  <Box
                    component="img"
                    src={select_class.class_image}
                    width="100%"
                    height={140}
                    borderRadius={1}
                    sx={{
                      objectFit: "cover",
                    }}
                  />
                </CardContent>
              </Box>
              <Box width="100%">
                <CardContent>
                  <Typography variant="h6">
                    {select_class.class_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Instructor: {select_class.instructor_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${select_class.price}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                price={select_class.price}
                select_class={select_class}
              />
            </Elements>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Payment;
