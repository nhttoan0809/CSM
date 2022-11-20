import { Box } from "@mui/material";
import React from "react";
import CustomizeCanvas from "../../components/3D/CustomizeCanvas";
// import Scene from "./../../components/3D/Scene";

const GoodsConfigurationPage = () => {
  return (
    <>
    <Box
      sx={{
        width: "100%",
        minHeight: "70vh",
        display: "flex",
        flex: 1,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
          marginRight: "2rem",
          minHeight: "600px",
          minWidth: "600px",
          flex: 1,
        }}
      >
        <CustomizeCanvas>
          {/* <Scene /> */}
        </CustomizeCanvas>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
          minWidth: "15rem",
        }}
      >
        Control Box
      </Box>
    </Box>
    </>
  )
}

export default GoodsConfigurationPage