import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import * as api from "../api";
import Logo from "../components/Logo";

const RegisterPage = () => {
  const [isFailed, setIsFaild] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password is required"),
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    company: yup.string().required("Company Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      repPassword: "",
      name: "",
      email: "",
      company: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (form) => {
    const username = form.username; //"thanhtoan"
    const password = form.password; //"thanhtoan123"
    const name = form.name;
    const email = form.email;
    const company = form.company;
    // console.log(password);
    const res = api.authAPI.register(username, password, name, email, company);
    res.then((data) => {
      const status = data.status;
      if (status === "Successfully") {
        setIsFaild("success");
      } else {
        setIsFaild("error");
      }
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const initField = (field) => {
    return (
      <Box>
        <TextField
          variant="outlined"
          label={field}
          required
          sx={{
            width: "100%",
            maxWidth: "450px",
          }}
          name={field}
          value={formik.values[field]}
          onChange={formik.handleChange}
          error={formik.touched[field] && Boolean(formik.errors[field])}
          helperText={formik.touched[field] && formik.errors[field]}
        />
      </Box>
    );
  };

  const initPasswordField = (field) => {
    return (
      <Box>
        <FormControl
          sx={{ width: "100%", maxWidth: "450px" }}
          variant="outlined"
        >
          <InputLabel htmlFor={field} required>
            {field === "password" ? "password" : "pasword comfirmation"}
          </InputLabel>
          <OutlinedInput
            id={field}
            type={showPassword ? "text" : "password"}
            name={field}
            value={formik.values[field]}
            onChange={formik.handleChange}
            error={formik.touched[field] && Boolean(formik.errors[field])}
            endAdornment={
              field === "password" && (
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
              )
            }
            label={field === "password" ? "password" : "pasword comfirmation"}
          />
          {!!formik.touched[field] && (
            <FormHelperText error id={`${field}-error`}>
              {formik.errors[field]}
            </FormHelperText>
          )}
        </FormControl>
      </Box>
    );
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
                marginBottom: "30px",
              }}
            >
              <Logo />
              <h1 style={{ marginBottom: "10px" }}>Create a Account</h1>
              <p style={{ opacity: "0.7" }}>Please enter your details</p>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {initField("username")}
              {initPasswordField("password")}
              {initPasswordField("passwordConfirmation")}
              {initField("name")}
              {initField("email")}
              {initField("company")}

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
                    <Alert severity={isFailed}>
                      {isFailed === "success"
                        ? "Register successfully"
                        : "Something went wrong! Registation failed."}
                    </Alert>
                  </Box>
                </Box>
              )}
            </Box>

            <Grid
              container
              spacing={2}
              sx={{
                marginTop: "30px",
              }}
            >
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  sx={{
                    width: "80%",
                    height: "55px",
                    border: "none",
                    color: "#43AB46",
                    fontSize: "18px",
                  }}
                  onClick={() => navigate("/login")}
                  tabIndex={1}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  sx={{
                    width: "80%",
                    height: "55px",
                    border: "none",
                    color: "white",
                    background: "#43AB46",
                    fontSize: "18px",
                  }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
