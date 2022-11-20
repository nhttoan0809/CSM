import { Box, Button, Slider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAgentList } from "../../../redux/agent";
import { setDrawerTab, setExpandDrawer } from "../../../redux/drawer";
import { setWarehouseList } from "../../../redux/warehouse";
import * as api from "./../../../api";

const SliderCustomize = (props) => {
  return (
    <Slider
      sx={{ marginX: "2rem" }}
      aria-label="Temperature"
      valueLabelDisplay="auto"
      // step={1}
      marks
      // min={1}
      // max={10}
      {...props}
    />
  );
};

const AddWarehouse = ({ data }) => {
  const id_agent = data[0];

  const currentAgent = useSelector((state) => state.agent.currentAgent);
  const agentList = useSelector((state) => state.agent.agentList);
  const agentSelected = agentList.filter((agent) => agent._id === id_agent)[0];

  const [warehouse_name, setWarehouse_name] = useState("");
  const [address, setAddress] = useState("");
  const [length, setLength] = useState(500);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);

  const dispatch = useDispatch();

  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h4" sx={{ marginBottom: "1.5rem" }}>
            Thêm kho
          </Typography>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
              flex: 1,
            }}
          >
            <Typography style={{ minWidth: "7rem" }}>Đại lý: </Typography>
            <TextField
              disabled
              variant="standard"
              inputProps={{ style: { textAlign: "center" } }}
              sx={{ flex: 1 }}
              value={agentSelected.agent_name}
            />
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
              flex: 1,
            }}
          >
            <Typography style={{ minWidth: "7rem" }}>Tên kho: </Typography>
            <TextField
              variant="standard"
              inputProps={{ style: { textAlign: "center" } }}
              sx={{ flex: 1 }}
              value={warehouse_name}
              onChange={(e) => {
                setWarehouse_name(e.target.value);
              }}
            />
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
              flex: 1,
            }}
          >
            <Typography style={{ minWidth: "7rem" }}>Địa chỉ: </Typography>
            <TextField
              variant="standard"
              inputProps={{ style: { textAlign: "center" } }}
              sx={{ flex: 1 }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
              flex: 1,
            }}
          >
            <Typography sx={{ minWidth: "6rem" }}>
              Chiều rộng: {width}
            </Typography>
            <SliderCustomize
              value={width}
              onChange={(e) => {
                setWidth(e.target.value);
              }}
              min={200}
              max={400}
              step={100}
            />
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
              flex: 1,
            }}
          >
            <Typography sx={{ minWidth: "6rem" }}>
              Chiều dài: {length}
            </Typography>
            <SliderCustomize
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
              min={400}
              max={500}
              step={100}
            />
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
              flex: 1,
            }}
          >
            <Typography sx={{ minWidth: "6rem" }}>
              Chiều cao: {height}
            </Typography>
            <SliderCustomize
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
              }}
              min={200}
              max={400}
              step={100}
            />
          </Box>
        </Box>

        <Box
          sx={{ margin: "1rem", display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            sx={{ marginRight: "1rem" }}
            variant="outlined"
            onClick={() => {
              dispatch(setDrawerTab({ type: "", action: "", data: "" }));
              dispatch(setExpandDrawer(false));
            }}
          >
            Hủy
          </Button>
          <Button
            variant="outlined"
            onClick={async () => {
              await api.warehouseAPI.add(
                id_agent,
                warehouse_name,
                address,
                length,
                width,
                height
              );
              dispatch(setDrawerTab({ type: "", action: "", data: "" }));
              dispatch(setExpandDrawer(false));
              await api.agentAPI.get_all().then((data) => {
                if (data.status === "Successfully") {
                  dispatch(setAgentList(data.data));
                } else {
                  dispatch(setAgentList([]));
                }
              });
              if (currentAgent === id_agent) {
                await api.warehouseAPI.get_all(id_agent).then((data) => {
                  if (data.status === "Successfully") {
                    dispatch(setWarehouseList(data.data));
                  } else {
                    dispatch(setWarehouseList([]));
                  }
                });
              }
            }}
          >
            Thêm
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AddWarehouse;
