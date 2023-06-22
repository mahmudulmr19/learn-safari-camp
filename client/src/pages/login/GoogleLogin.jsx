import React from "react";
import { Button } from "@mui/material";
import { Google } from "@mui/icons-material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/Firebase";
import { useAuth, useAxios } from "@/hooks";
import { useNavigate } from "react-router-dom";
const GoogleLogin = ({ setError, setLoading, from }) => {
  const [api] = useAxios();
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((UserCredential) => {
        const user = UserCredential.user;
        api
          .post("/api/google_login", {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
          .then((res) => {
            login(res.data.token);
            navigate(from);
          });
      })
      .catch((error) => {
        setLoading(false);
        setError(error.code);
      });
  };

  return (
    <Button
      fullWidth
      variant="outlined"
      color="primary"
      sx={{
        mt: 1,
      }}
      onClick={handleGoogleLogin}
      startIcon={<Google />}
    >
      Login with Google
    </Button>
  );
};

export default GoogleLogin;
