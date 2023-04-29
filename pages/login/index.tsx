import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../typings/types";
import { AppContext } from "../contexts/AppContext";
import { useNavigate, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Link from "next/link";

const Login = () => {
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });

  const SignIn = async () => {
    const isValid = user.email.length > 0 && user.password.length > 0;
    if (!isValid) return setOpen(true);
    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      console.log("user success : ", await response.json());
      <Navigate to={"/routes/menus"} replace={true} />;
      // navigate("/menus?locationId=2");
    } catch (err) {
      console.log("Error here: ", err);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Please enter email and password"
          action={action}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 400,
            minWidth: 400,
            mt: 5,
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            sx={{ mb: 2, outline: "none" }}
            onChange={(evt) => setUser({ ...user, email: evt.target.value })}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            sx={{ mb: 2 }}
            onChange={(evt) => setUser({ ...user, password: evt.target.value })}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              mt: 5,
            }}
          >
            <Button variant="outlined" onClick={SignIn}>
              Log in
            </Button>
            <Link href={"/register"}>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Register
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Login;
