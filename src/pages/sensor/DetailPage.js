import styled from "@emotion/styled";
import {
  Button,
  Menu,
  MenuItem,
  Paper,
  SwipeableDrawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AddDrawer from "../../components/AddDrawer";
import AccDetailscustomize from "../../components/sensor/AccDetailscustomize";
import AccSumaryCustomize from "../../components/sensor/AccSumaryCustomize";
import AccCustomize from "./../../components/sensor/AccCustomize";

function createData(id, position, status) {
  return { id, position, status };
}

const rows = [
  createData(123, `--/--/--`, `khong kich hoat`),
  createData(456, `0:4:4`, `su dung`),
  createData(789, `--/--/--`, `san sang`),
];

const MenuCustomize = ({ title, toggleText, onClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div onClick={handleClick}>{title}</div>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={(e) => {
            onClick();
            handleClose(e);
          }}
        >
          <Typography
          // sx={{
          //   "&:hover": {
          //     color: "red",
          //   },
          // }}
          >
            {toggleText}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

const GenerateSensorTable = ({ rows }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID Cảm biến</TableCell>
              <TableCell align="center">Vị trí</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.position}</TableCell>
                <TableCell align="center">
                  <Button>
                    <MenuCustomize
                      title={row.status}
                      toggleText={`kich hoat`}
                      handleClick={() => console.log("click to active")}
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const SensorDetailPage = () => {
  const idWarehouse = useSelector((state) => state.warehouse.currentWarehouse);
  // const rows = useSelector((state) => state.sensor.sensorList);
  // const dispatch = useDispatch();

  useEffect(() => {
    // api.s
    // fetch("http://localhost:5000/test_data/getAllSensor")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // console.log("data: ", data)
    //     const payloadCustomize = data.data.map((sensor) => (
    //       {
    //         "sensor_id": sensor.sensor_id,
    //         "data": sensor.data,
    //         "is_activated": sensor.is_activated,
    //         "position": sensor.position,
    //     }
    //     ))
    //     dispatch(setSensorList(payloadCustomize))
    //   });
  }, []);

  const [expandDrawer, setExpandDrawer] = useState(false);

  if (idWarehouse === -1) {
    return <Navigate to="/agent" replace={true} />;
  }

  return (
    <>
      <AddDrawer
        text={`+`}
        title={`Thêm tài khoản IOT`}
        handleFunc={async () => {
          // await fetch();
          console.log("handle them iot account");
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
            flex: 1,
          }}
        >
          <Typography style={{ minWidth: "6rem" }}>Tài khoản:</Typography>
          <TextField
            variant="standard"
            inputProps={{ style: { textAlign: "center" } }}
            sx={{ flex: 1 }}
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
          <Typography style={{ minWidth: "6rem" }}>Mật khẩu: </Typography>
          <TextField
            variant="standard"
            type="password"
            inputProps={{ style: { textAlign: "center" } }}
            sx={{ flex: 1 }}
          />
        </Box>
      </AddDrawer>

      <AccCustomize>
        <AccSumaryCustomize
          title={`Thanh Toan`}
          onUnConnect={() => console.log("handle unConnect")}
        />
        <AccDetailscustomize>
          <GenerateSensorTable rows={rows} />
        </AccDetailscustomize>
      </AccCustomize>
      <AccCustomize>
        <AccSumaryCustomize
          title={`Thanh Toan`}
          onUnConnect={() => console.log("handle unConnect")}
        />
        <AccDetailscustomize>
          <GenerateSensorTable rows={rows} />
        </AccDetailscustomize>
      </AccCustomize>
      <AccCustomize>
        <AccSumaryCustomize
          title={`Thanh Toan`}
          onUnConnect={() => console.log("handle unConnect")}
        />
        <AccDetailscustomize>
          <GenerateSensorTable rows={rows} />
        </AccDetailscustomize>
      </AccCustomize>
    </>
  );
};

export default SensorDetailPage;
