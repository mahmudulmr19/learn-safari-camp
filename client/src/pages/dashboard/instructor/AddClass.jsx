import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Typography,
  TextField,
  Grid,
  Box,
  FormControl,
  Container,
  alpha,
  Stack,
  useTheme,
  IconButton,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import { useAuth, useAxios } from "@/hooks";
import { Delete } from "@mui/icons-material";
import fileImage from "@/assets/global/fileImage.svg";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { Toast } from "@/components/global";
import { Helmet } from "react-helmet-async";

const ClassSchema = yup.object().shape({
  class_name: yup.string().required("Class Name is required"),
  available_seats: yup
    .number()
    .typeError("Available Seats must be a number")
    .required("Available Seats is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
});

const AddClass = () => {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const [api] = useAxios();
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ClassSchema),
  });

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append("image", file);

    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_UPLOAD_KEY
        }`,
        formData
      )
      .then((response) => {
        if (response.data.data.display_url) {
          setImage(response.data.data.display_url);
        }
      })
      .catch(() => {
        setOpen(true);
        setMessage("Photo upload failed");
      });
  };

  const onSubmit = (data) => {
    setLoading(true);
    if (!image) {
      setImageError("Please select you class photo");
      setLoading(false);
      return;
    }

    const newClass = {
      instructor_name: currentUser.displayName,
      instructor_email: currentUser.email,
      class_image: image,
      status: "pending",
      total_enrolled_students: 0,
      ...data,
    };

    api
      .post("/api/instructors/classes/create", newClass)
      .then((res) => {
        if (res.data.insertedId) {
          setOpen(true);
          setMessage("Class created successfully!");
          reset();
          window.scrollTo(0, 0);
          setImage("");
        }
      })
      .catch(() => {
        setOpen(true);
        setMessage("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard: Add A Class</title>
      </Helmet>

      <Container>
        <Typography variant="h6" gutterBottom>
          Add A Class
        </Typography>

        <Toast open={open} onClose={() => setOpen(false)} message={message} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={2}
            mt={5}
            sx={{
              [theme.breakpoints.up("lg")]: {
                pl: 12,
              },
            }}
          >
            <Grid item sm={12} xs={12}>
              <TextField
                label="Class Name"
                fullWidth
                {...register("class_name")}
                error={Boolean(errors.class_name?.message)}
                helperText={errors.class_name?.message}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <FormControl fullWidth>
                {!image && (
                  <>
                    <input
                      accept="image/*"
                      id="image"
                      type="file"
                      onChange={(e) => {
                        setImage(URL.createObjectURL(e.target.files[0])),
                          handleFileUpload(e.target.files[0]);
                      }}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="image">
                      <Typography variant="subtitle1" mb={1}>
                        Class Image
                      </Typography>
                      <Box
                        sx={{
                          backgroundColor: (theme) =>
                            alpha(theme.palette.background.neutral, 0.2),
                          padding: 5,
                          border: "1px dashed",
                          borderRadius: "5px",
                          borderColor: (theme) =>
                            alpha(theme.palette.text.primary, 0.2),
                          cursor: "pointer",
                          position: "relative",
                          "&:hover": {
                            "&:before": {
                              top: 0,
                              left: 0,
                              position: "absolute",
                              content: "''",
                              zIndex: 1,
                              width: "100%",
                              height: "100%",
                              borderRadius: "5px",
                              bgcolor: (theme) =>
                                alpha(theme.palette.background.neutral, 0.1),
                            },
                          },
                        }}
                      >
                        <Stack
                          direction="column"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <img src={fileImage} alt="file image" height={250} />

                          <Stack direction="column" textAlign="center">
                            <Typography variant="h6">
                              Drop or Select file
                            </Typography>
                            <Typography variant="body2">
                              Drop files here or click{" "}
                              <span
                                style={{
                                  color: theme.palette.primary.main,
                                  textDecoration: "underline",
                                }}
                              >
                                browse
                              </span>
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>

                      {imageError && (
                        <FormHelperText
                          sx={{
                            color: (theme) => theme.palette.error.main,
                          }}
                        >
                          {imageError}
                        </FormHelperText>
                      )}
                    </label>
                  </>
                )}
                {image && (
                  <>
                    <img
                      src={image}
                      alt="Class Image"
                      style={{
                        height: "300px",
                        marginBottom: "8px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => setImage("")}
                      variant="contained"
                      sx={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        p: 1,
                        background: (theme) => theme.palette.error.main,
                        "&:hover": {
                          background: (theme) => theme.palette.error.dark,
                        },
                        color: "#fff",
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Instructor Name"
                fullWidth
                value={currentUser?.displayName}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Instructor Email"
                fullWidth
                value={currentUser?.email}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Available Seats"
                type="number"
                fullWidth
                {...register("available_seats")}
                error={Boolean(errors.available_seats?.message)}
                helperText={errors.available_seats?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                type="number"
                fullWidth
                {...register("price")}
                error={Boolean(errors.price?.message)}
                helperText={errors.price?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Box mt={2} textAlign="right">
            <LoadingButton
              loading={loading}
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                px: 6,
                background: theme.palette.text.primary,
                textShadow: "none",
                boxShadow: "none",
                color:
                  theme.palette.mode == "dark"
                    ? theme.palette.grey[900]
                    : theme.palette.grey[50],
                "&:hover": {
                  background: alpha(theme.palette.text.primary, 0.9),
                  color:
                    theme.palette.mode == "dark"
                      ? theme.palette.grey[900]
                      : theme.palette.grey[50],
                },
              }}
            >
              Add Class
            </LoadingButton>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default AddClass;
