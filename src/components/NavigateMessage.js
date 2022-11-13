import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NavigateMessage = ({ message, href }) => {
  const navigate = useNavigate();

  return (
    <>
      <Box style={{ width: "100%" }}>
        {`${message} `}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate(href);
          }}
        >
          Đại lý
        </a>
      </Box>
    </>
  );
};

export default NavigateMessage;
