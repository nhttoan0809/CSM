import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIdUser, setToken } from "../redux/user";
import * as api from './../api'

const LoginPage = () => {

  const token = useSelector(state => state.user.token)
  const distpatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [])

  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Button
        variant="outlined"
        onClick={() => {
          const res = api.authAPI.login('thanhtoan', 'thanhtoan123');
          res.then(data => {
            const status = data.status
            if (status === "Successfully") {
              distpatch(setIdUser(data.data.id_user));
              distpatch(setToken(data.data.access_token));
              navigate('/')
            }
            else {
              console.log('Login failure');
            }
          })
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
