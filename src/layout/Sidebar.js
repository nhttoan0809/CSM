import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { Box, Divider, Typography } from "@mui/material";
import styled from "@emotion/styled";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import SensorsIcon from "@mui/icons-material/Sensors";
import CategoryIcon from "@mui/icons-material/Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPallet,
  faBuilding,
  faHouseUser,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import { setToken } from "../redux/user";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTab } from "../redux/tabs";

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

const ButtonCustomized = styled(Button)(() => ({
  color: "#000000a6",
  minWidth: "170px",
  display: "flex",
  justifyContent: "flex-start",
  marginBottom: ".5rem",
  paddingLeft: '16px',
  paddingRight: '10px',
  "&.selected": {
    backgroundColor: "#6941c6",
    "& > *": {
      color: "white !important",
    },
  },
}));

const Sidebar = () => {
  const currentTab = useSelector(state => state.tab.currentTab)
  const naviagate = useNavigate();
  const distpatch = useDispatch();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}>
      {/* Management */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h5" sx={{ marginY: "10px" }}>
          Quan ly
        </Typography>

        <ButtonCustomized
          className={currentTab === "warehouse" ? "selected" : ""}
          onClick={() => {
            naviagate('warehouse');
          }}
        >
          <FontAwesomeIcon
            icon={faWarehouse}
            style={{
              fontSize: "18px",
              marginRight: "12px",
              marginBottom: "4px",
            }}
          />
          <Link to="#" style={linkStyle}>
            Kho
          </Link>
        </ButtonCustomized>

        <ButtonCustomized
          className={currentTab === "pallet" ? "selected" : ""}
          onClick={() => {
            distpatch(setCurrentTab("pallet"));
            naviagate('pallet');
          }}
        >
          <FontAwesomeIcon
            icon={faPallet}
            style={{
              fontSize: "18px",
              marginRight: "11px",
              marginBottom: "6px",
            }}
          />
          <Link to="#" style={linkStyle}>
            Pallet
          </Link>
        </ButtonCustomized>

        <ButtonCustomized
          className={currentTab === "goods" ? "selected" : ""}
          onClick={() => {
            distpatch(setCurrentTab("goods"));
            naviagate('goods');
          }}
        >
          <CategoryIcon sx={{ marginRight: "10px" }} />
          <Link to="#" style={linkStyle}>
            Hàng hóa
          </Link>
        </ButtonCustomized>

        <ButtonCustomized
          className={currentTab === "sensor" ? "selected" : ""}
          onClick={() => {
            distpatch(setCurrentTab("sensor"));
            naviagate('sensor');
          }}
        >
          <SensorsIcon sx={{ marginRight: "10px" }} />
          <Link to="#" style={linkStyle}>
            Cảm biến
          </Link>
        </ButtonCustomized>
      </Box>
      {/* Organization */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h5" sx={{ marginY: "10px" }}>
          To chuc
        </Typography>

        <ButtonCustomized
          className={currentTab === "company" ? "selected" : ""}
          onClick={() => {
            distpatch(setCurrentTab("company"));
            naviagate('company');
          }}
        >
          <FontAwesomeIcon
            icon={faBuilding}
            style={{
              fontSize: "21px",
              marginRight: "14px",
              marginLeft: "4px",
              marginBottom: "2px",
            }}
          />
          <Link to="#" style={linkStyle}>
            Công ty
          </Link>
        </ButtonCustomized>

        <ButtonCustomized
          className={currentTab === "agent" ? "selected" : ""}
          onClick={() => {
            distpatch(setCurrentTab("agent"));
            naviagate('agent');
          }}
        >
          <FontAwesomeIcon
            icon={faHouseUser}
            style={{
              fontSize: "18px",
              marginRight: "12px",
              marginLeft: "2px",
              marginBottom: "6px",
            }}
          />
          <Link to="#" style={linkStyle}>
            Đại lý
          </Link>
        </ButtonCustomized>
      </Box>
    </Box>
  );
};

export default Sidebar;
