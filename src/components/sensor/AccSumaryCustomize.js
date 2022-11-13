import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  AccordionSummary,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const AccSumaryCustomize = ({ title, onUnConnect }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      sx={{
        "& .MuiAccordionSummary-content": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
      }}
    >
      <Typography>Tai khoan IOT: {title}</Typography>
      <div>
        <Button onClick={handleClick}>
          <SettingsIcon />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            onClick={(e) => {
              onUnConnect();
              handleClose(e);
            }}
          >
            <Typography
              sx={{
                "&:hover": {
                  color: "red",
                },
              }}
            >
              Ngắt kết nối
            </Typography>
          </MenuItem>
        </Menu>
      </div>
    </AccordionSummary>
  );
};

export default AccSumaryCustomize;
