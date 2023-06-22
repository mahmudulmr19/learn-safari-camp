import { Toast } from "@/components/global";
import { useAuth, useAxios } from "@/hooks";
import { LoadingButton } from "@mui/lab";
import { Box, alpha } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, select_class }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { currentUser } = useAuth();
  const [api] = useAxios();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await api.post("/api/create-payment-intent", {
          price,
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        setOpen(true);
        setMessage(
          "Something went wrong! Please refresh the page and try again"
        );
      }
    };

    if (price > 0) {
      createPaymentIntent();
    }
  }, [price, api]);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement("card");

    if (card === null) {
      return;
    }

    setProcessing(true);

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setProcessing(false);
      setOpen(true);
      setMessage(error.message);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: currentUser?.displayName,
            email: currentUser.email,
          },
        },
      });

    if (confirmError) {
      setProcessing(false);
      setOpen(true);
      setMessage(confirmError.message);
    }

    if (paymentIntent.status === "succeeded") {
      const payment = {
        classId: select_class.classId,
        class_name: select_class.class_name,
        class_image: select_class.class_image,
        instructor_name: select_class.instructor_name,
        price: price,
        name: currentUser?.displayName,
        email: select_class.email,
        date: new Date(),
        transactionId: paymentIntent.id,
      };

      api
        .post("/api/payments", payment)
        .then((res) => {
          if (res.data.insertedId) {
            setOpen(true);
            setMessage("Payment successfully");
            setProcessing(false);
            setTimeout(() => {
              navigate("/student_dashboard/my_enrolled_classes");
            }, 1000);
          }
        })
        .catch(() => {
          setProcessing(false);
          setOpen(true);
          setMessage("Something went wrong");
        });
    }
  };

  return (
    <>
      <Toast open={open} onClose={() => setOpen(false)} message={message} />

      <Box
        component="form"
        display="flex"
        flexDirection="column"
        onSubmit={handlePayment}
      >
        <CardElement />

        <LoadingButton
          sx={{
            mt: 2,
            px: 6,
            background: (theme) => theme.palette.text.primary,
            textShadow: "none",
            boxShadow: "none",
            color: (theme) =>
              theme.palette.mode === "dark"
                ? theme.palette.grey[900]
                : theme.palette.grey[50],
            "&:hover": {
              background: (theme) => alpha(theme.palette.text.primary, 0.9),
              color: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.grey[900]
                  : theme.palette.grey[50],
            },
          }}
          disabled={!stripe}
          loading={processing}
          type="submit"
        >
          Pay ${price}
        </LoadingButton>
      </Box>
    </>
  );
};

export default CheckoutForm;
