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
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/Firebase";
import { useAuth, useAxios } from "@/hooks";
import { LoadingButton } from "@mui/lab";
import GoogleLogin from "./GoogleLogin";
import { Helmet } from "react-helmet-async";

const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [api] = useAxios();
  const { login, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const onSubmit = (data) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        api
          .post("/api/login", { email: data.email })
          .then((res) => {
            setError("");
            setLoading(false);
            login(res.data.token);
            navigate(from);
          })
          .catch((err) => {
            setLoading(false);
            logout();
            setError(err.response.data.message);
          });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.code);
      });
  };

  return (
    <>
      <Helmet>
        <title>Login - Learn With Safari</title>
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
                New user?{" "}
                <Link
                  to="/auth/register"
                  style={{
                    color: "#4caf50",
                  }}
                >
                  Create an account
                </Link>
              </Typography>
            </Stack>

            {error && (
              <Alert variant="standard" severity="error">
                {error}
              </Alert>
            )}

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
              Login
            </LoadingButton>
          </Stack>
          <Typography variant="subtitle1" sx={{ textAlign: "center", mt: 2 }}>
            Or sign with
          </Typography>

          <GoogleLogin
            setError={setError}
            setLoading={setLoading}
            from={from}
          />
        </Box>
      </Box>
    </>
  );
};

export default Login;
