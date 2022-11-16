import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import * as api from "../api";
import Logo from "../components/Logo";
import { setIdUser, setToken } from "../redux/user";

const LoginPage = () => {
  const token = useSelector((state) => state.user.token);
  const [isFailed, setIsFaild] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const distpatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (form) => {
    const username = form.username; //"thanhtoan"
    const password = form.password; //"thanhtoan123"
    // console.log(username + " " + password);
    const res = api.authAPI.login(username, password);
    res.then((data) => {
      const status = data.status;
      if (status === "Successfully") {
        distpatch(setIdUser(data.data.id_user));
        distpatch(setToken(data.data.access_token));
        navigate("/");
      } else {
        setIsFaild(true);
      }
    });
  };

  const handleNavigateSignupPage = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      sx={{
        margin: 0,
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          borderRadius: "10px",
          overflow: "hidden",
          minHeight: "100vh",
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "content",
            borderRadius: "8px",
            border: "1px solid #dadce0",
            width: "500px",
            padding: "20px",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                marginBottom: "50px",
              }}
            >
              <Logo />

              <h1 style={{ marginBottom: "10px" }}>Welcome to back</h1>
              <p style={{ opacity: "0.7" }}>Please enter your details</p>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "35px",
              }}
            >
              <Box>
                <TextField
                  variant="outlined"
                  label="username"
                  required
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                  sx={{
                    width: "100%",
                    maxWidth: "450px",
                  }}
                />
              </Box>
              <Box>
                <FormControl
                  sx={{ width: "100%", maxWidth: "450px" }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password" required>
                    password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={(e) => handleMouseDownPassword(e)}
                          edge="end"
                          tabIndex={1}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="password"
                  />
                  {!!formik.touched.password && (
                    <FormHelperText error id="password-error">
                      {formik.errors.password}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>

              {!!isFailed && (
                <Box>
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: "450px",
                      display: "inline-flex",
                      flexDirection: "column",
                    }}
                  >
                    <Alert severity="error">Login failed.</Alert>
                  </Box>
                </Box>
              )}
            </Box>

            <Box
              sx={{
                marginTop: "30px",
              }}
            >
              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{
                  width: "100%",
                  maxWidth: "450px",
                  fontSize: "18px",
                  height: "55px",
                  border: "none",
                  color: "white",
                  background: "#43AB46",
                }}
              >
                Login
              </Button>
            </Box>
            <Box>
              <p>
                You don't have account?{" "}
                <a href="#" onClick={(e) => handleNavigateSignupPage(e)}>
                  Signup
                </a>
              </p>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
