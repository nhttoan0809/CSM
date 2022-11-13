import { Accordion } from "@mui/material";
import React from "react";

const AccCustomize = ({ children }) => {
  return (
    <Accordion sx={{ marginBottom: "1rem", borderRadius: "0.3rem" }}>
      {children}
    </Accordion>
  );
};

export default AccCustomize;
