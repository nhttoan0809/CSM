import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../redux/user";

const LoginPage = () => {
  
  const token = useSelector(state => state.user.token)
  const distpatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // const token = window.localStorage.getItem('accessToken-CSM');
    if(token){
      navigate('/');
    }
  }, [])

  return (
    <Box sx={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Button
        variant="outlined"
        onClick={() => {
          fetch("http://localhost:5000/test_data/loginTT")
            .then(response => response.json())
            .then(data => {
              const status = data.status
              if(status==="Successfully") {
                distpatch(setToken(data.access_token))
                
                navigate('/')
              }
              else{
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
