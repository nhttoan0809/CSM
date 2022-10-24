import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerTab, setExpandDrawer } from "../../../redux/drawer";

const TextFieldCustomized = styled((props) => {
  return <TextField variant="outlined" {...props}></TextField>;
})(() => ({
  margin: "10px 0",
}));

const UpdateSensor = (props) => {
  const id_Object = props.data[0];
  const sensorList = useSelector((state) => state.sensor.sensorList);
  const sensor = sensorList.filter(
    (sensor) => sensor.sensor_id === id_Object
  )[0];

  // console.log(sensor);

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
          <Typography variant="h4">{sensor.sensor_id}</Typography>
          <TextFieldCustomized disabled label="Nhiet do" value={sensor.data} />
          <TextFieldCustomized
            disabled
            label="Trang thai"
            value={sensor.is_activated ? "Kich hoat" : "Co san"}
          />
          <TextFieldCustomized label="Vi tri" value={sensor.position} />
        </Box>
        <Box
          sx={{ margin: "1rem", display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              dispatch(setDrawerTab({ type: "", action: "", data: "" }));
              dispatch(setExpandDrawer(false));
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UpdateSensor;
