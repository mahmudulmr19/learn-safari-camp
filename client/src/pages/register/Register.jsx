import React, { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  InputAdornment,
  Typography,
  alpha,
  useTheme,
  IconButton,
  Avatar,
  Alert,
} from "@mui/material";
import { CloudUpload, Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase/Firebase";
import { LoadingButton } from "@mui/lab";
import { useAuth, useAxios } from "@/hooks";
import { Helmet } from "react-helmet-async";

const RegisterSchema = yup.object().shape({
  firstName: yup.string().required("First name required"),
  lastName: yup.string().required("Last name required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one capital letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Confirm Password is required"),
  photoURL: yup.string(),
});

const Register = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageError, setSelectedImageError] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [api] = useAxios();
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
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
          setImageUrl(response.data.data.display_url);
        }
      })
      .catch(() => {
        setError("Photo upload failed");
        setLoading(false);
      });
  };

  const onSubmit = (data) => {
    if (!selectedImage) {
      return setSelectedImageError("Photo is required");
    } else {
      setSelectedImageError("");
    }
    setError("");
    setLoading(true);

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((UserCredential) => {
        const user = UserCredential.user;
        updateProfile(user, {
          displayName: `${data.firstName} ${data.lastName}`,
          photoURL: imageUrl,
        }).then(() => {
          api
            .post("/api/register", {
              name: `${data.firstName} ${data.lastName}`,
              email: data.email,
              photoURL: imageUrl,
            })
            .then((res) => {
              if (res.data.token) {
                login(res.data.token);
                navigate(from);
              } else {
                setError(res.data.message);
              }
            })
            .catch((err) => {
              setLoading(false);
              setError(err.message);
            });
        });
      })
      .catch((error) => {
        setLoading(false);
        setError(error.code);
      });
  };

  return (
    <>
      <Helmet>
        <title>Create an account - Learn With Safari</title>
      </Helmet>
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "100%",
            maxWidth: "500px",
            px: 2,
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h6" fontWeight={400} mb={2}>
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  style={{
                    color: "#4caf50",
                  }}
                >
                  Sign in
                </Link>
              </Typography>
            </Stack>

            {error && (
              <Alert variant="standard" severity="error">
                {error}
              </Alert>
            )}

            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="First name"
                variant="outlined"
                {...register("firstName", { required: true })}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message}
              />
              <TextField
                fullWidth
                label="Last name"
                variant="outlined"
                {...register("lastName", { required: true })}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message}
              />
            </Stack>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              {...register("email", { required: true })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              {...register("confirmPassword", { required: true })}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* File upload input */}
            <input
              type="file"
              id="photoUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                setSelectedImage(URL.createObjectURL(e.target.files[0])),
                  handleFileUpload(e.target.files[0]);
              }}
            />
            <label htmlFor="photoUpload">
              {!selectedImage && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      backgroundColor: theme.palette.text.primary,
                      color: theme.palette.mode === "dark" ? "#000" : "#fff",
                      cursor: "pointer",
                    }}
                  >
                    <CloudUpload />
                  </Box>
                  Upload Photo
                </div>
              )}
              {selectedImage && (
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    cursor: "pointer",
                    position: "relative",
                    "&:hover": {
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: alpha("#000", 0.3),
                      },
                    },
                  }}
                  src={selectedImage}
                />
              )}
            </label>

            {selectedImageError && (
              <p style={{ color: "#f44336" }}>{selectedImageError}</p>
            )}

            <LoadingButton
              loading={loading}
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
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
              Create account
            </LoadingButton>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Register;
