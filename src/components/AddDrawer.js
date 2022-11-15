import { Box, Button, SwipeableDrawer } from "@mui/material";
import React, { useState } from "react";

const AddDrawer = ({ text, title, children, handleFunc }) => {
  const [expandDrawer, setExpandDrawer] = useState(false);

  return (
    <>
      <SwipeableDrawer
        anchor={"right"}
        open={expandDrawer}
        onClose={() => setExpandDrawer(false)}
        onOpen={() => setExpandDrawer(true)}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            padding: "0rem 2rem 0",
            minWidth: "25rem",
          }}
        >
          <Box>
            <h1>{title}</h1>
            {children}
          </Box>
          <Box
            sx={{
              margin: "1rem 0 1rem 1rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{ marginRight: "1rem" }}
              variant="outlined"
              onClick={() => {
                setExpandDrawer(false);
              }}
            >
              Huy
            </Button>
            <Button
              variant="outlined"
              onClick={async () => {
                const isExpand = await handleFunc();
                setExpandDrawer(isExpand);
              }}
            >
              Them
            </Button>
          </Box>
        </Box>
      </SwipeableDrawer>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "-1rem",
        }}
      >
        <Button
          style={{
            marginBottom: "1rem",
            fontSize: "1.5rem",
            padding: "0rem",
            backgroundColor: "#6941c6",
            borderRadius: "0.5rem",
            color: "white",
            width: "2.5rem",
            height: "2.5rem",
            minWidth: "auto",
          }}
          onClick={() => setExpandDrawer(true)}
        >
          <h3>{text}</h3>
        </Button>
      </div>
    </>
  );
};

export default AddDrawer;
