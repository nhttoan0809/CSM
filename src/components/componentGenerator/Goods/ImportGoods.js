import styled from "@emotion/styled";
import { Button, Slider, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDrawerTab, setExpandDrawer } from "../../../redux/drawer";
import * as api from "../../../api";

const TextFieldCustomized = styled((props) => {
  return <TextField variant="outlined" {...props}></TextField>;
})(() => ({
  margin: "10px 0",
}));

const ImportGoods = () => {
  const AgentList = useSelector((state) => state.agent.agentList);
  const warehouseList = useSelector((state) => state.warehouse.warehouseList);
  const agent_id = useSelector((state) => state.agent.currentAgent);
  const warehouse_id = useSelector((state) => state.warehouse.currentWarehouse);

  const [description, setDescription] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <Typography variant="h4">Nhap Hang</Typography>
          <TextFieldCustomized
            disabled
            label="Dai ly"
            value={
              AgentList.filter((agent) => agent._id === agent_id)[0].agent_name
            }
          />
          <TextFieldCustomized
            disabled
            label="Kho"
            value={
              warehouseList.filter(
                (warehouse) => warehouse.warehouse_id === warehouse_id
              )[0].name
            }
          />

          <TextFieldCustomized
            label="Mo ta"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          {/* So luong */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ minWidth: "6rem" }}>
              So luong: {quantity}
            </Typography>
            <Slider
              sx={{ marginX: "2rem" }}
              aria-label="Temperature"
              defaultValue={1}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              onChange={(event) => {
                setQuantity(event.target.value);
              }}
            />
          </Box>
          {/* Chieu rong */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ minWidth: "6rem" }}>Rong: {width}</Typography>
            <Slider
              sx={{ marginX: "2rem" }}
              aria-label="Temperature"
              defaultValue={1}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              onChange={(event) => {
                setWidth(event.target.value);
              }}
            />
          </Box>
          {/* Chieu dai */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ minWidth: "6rem" }}>Dai: {length}</Typography>
            <Slider
              sx={{ marginX: "2rem" }}
              aria-label="Temperature"
              defaultValue={1}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              onChange={(event) => {
                setLength(event.target.value);
              }}
            />
          </Box>
          {/* Chieu cao */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ minWidth: "6rem" }}>Cao: {height}</Typography>
            <Slider
              sx={{ marginX: "2rem" }}
              aria-label="Temperature"
              defaultValue={1}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              onChange={(event) => {
                setHeight(event.target.value);
              }}
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
            Huy
          </Button>
          <Button
            variant="outlined"
            onClick={async () => {
              for (let i = 0; i < quantity; i++) {
                await api.warehouseAPI
                  .import(
                    agent_id,
                    warehouse_id,
                    description,
                    width,
                    length,
                    height
                  )
                  .then((data) => {
                    if (data.status === "Successfully") {
                    }
                  });
              }
              dispatch(setDrawerTab({ type: "", action: "", data: "" }));
              dispatch(setExpandDrawer(false));
              navigate("/goods");
            }}
          >
            Nhap
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ImportGoods;
