import {
  Box,
  Button,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AddDrawer from "../../components/AddDrawer";
import AccDetailscustomize from "../../components/sensor/AccDetailscustomize";
import AccSumaryCustomize from "../../components/sensor/AccSumaryCustomize";
import { setIotAccountList } from "../../redux/iotAccount";
import * as api from "./../../api";
import AccCustomize from "./../../components/sensor/AccCustomize";

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
      <div
        onClick={handleClick}
        style={{
          color:
            title === "Sẵn sàng"
              ? ""
              : title === "Đang sử dụng"
              ? "green"
              : "red",
        }}
      >
        {title}
      </div>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={(e) => {
            onClick(toggleText);
            handleClose(e);
          }}
        >
          <Typography
            sx={{
              "&:hover": {
                color: toggleText === "Kích hoạt" ? "green" : "red",
              },
            }}
          >
            {toggleText}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

const GenerateSensorTable = ({ idIotAccount }) => {
  const id_agent = useSelector((state) => state.agent.currentAgent);
  const id_warehouse = useSelector((state) => state.warehouse.currentWarehouse);

  const [stationList, setStationList] = useState([]);

  useEffect(() => {
    api.stationAPI
      .get_all(id_agent, id_warehouse, idIotAccount)
      .then((res) => {
        return res.status === "Successfully" ? res.data : [];
      })
      .then((data) => {
        setStationList(data);
      });
  }, [id_agent, id_warehouse, idIotAccount]);

  const dispatch = useDispatch();

  return (
    <>
      <Box sx={{ padding: "0 1rem" }}>
        {stationList.length === 0 ? (
          <Typography sx={{ margin: "1rem 0" }}>
            Tai khoan nay hien khong co tram cam bien nao!!!
          </Typography>
        ) : (
          <>
            {stationList.map((station, ind) => {
              return (
                <div key={ind}>
                  <Typography variant="h6" sx={{ textAlign: "left" }}>
                    Trạm: {station._id}
                  </Typography>
                  <TableContainer
                    component={Paper}
                    sx={{
                      padding: "0 1rem",
                      margin: "1rem 0",
                      boxShadow:
                        "0px 2px 1px -1px rgb(0 0 0 / 50%), 0px 1px 1px 0px rgb(0 0 0 / 0%), 0px 1px 3px 0px rgb(0 0 0 / 50%)",
                    }}
                  >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">ID Cảm biến</TableCell>
                          <TableCell align="center">Vị trí</TableCell>
                          <TableCell align="center">Trạng thái</TableCell>
                        </TableRow>
                      </TableHead>
                      <GenerateTableBody
                        idIotAccount={idIotAccount}
                        idStation={station._id}
                      />
                    </Table>
                  </TableContainer>
                </div>
              );
            })}
          </>
        )}
      </Box>
    </>
  );
};

const GenerateTableBody = ({ idIotAccount, idStation }) => {
  const id_agent = useSelector((state) => state.agent.currentAgent);
  const id_warehouse = useSelector((state) => state.warehouse.currentWarehouse);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.sensorAPI
      .get_all(id_agent, id_warehouse, idIotAccount, idStation)
      .then((res) => {
        if (res.status === "Successfully") {
          setRows(res.data);
        } else {
          setRows([]);
        }
      });
  }, [idIotAccount, idStation]);

  return (
    <>
      {rows.length > 0 && (
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                // "& .MuiTableCell-root": { padding: "0.5rem" },
              }}
            >
              <TableCell component="th" scope="row" align="center">
                {row._id}
              </TableCell>
              <TableCell align="center">{row.position ?? `--/--/--`}</TableCell>
              <TableCell align="center">
                <Button size="small">
                  <MenuCustomize
                    title={
                      // (row.status===1)?'Đang sử dụng':(row.status===0?'Sẵn sàng':'Không thể sử dụng')
                      row.status ? "Đang sử dụng" : "Sẵn sàng"
                      // `Sẵn sàng`
                    }
                    toggleText={
                      row.status ? `Gỡ bỏ` : `Kích hoạt`
                      // `Kích hoạt`
                    }
                    onClick={(message) => {
                      api.sensorAPI
                        .set_status(
                          id_agent,
                          id_warehouse,
                          idIotAccount,
                          idStation,
                          row._id,
                          message === "Gỡ" ? 0 : 1
                        )
                        .then((res) => {
                          if (res.status === "Successfully") {
                            api.sensorAPI
                              .get_all(
                                id_agent,
                                id_warehouse,
                                idIotAccount,
                                idStation
                              )
                              .then((res) => {
                                if (res.status === "Successfully") {
                                  setRows(res.data);
                                } else {
                                  setRows([]);
                                }
                              });
                          }
                        });
                    }}
                  />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </>
  );
};

const AddIOTAccount = ({ idAgent, idWarehouse }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorAccount, setIsErrorAccount] = useState("");

  const dispatch = useDispatch();

  return (
    <>
      <AddDrawer
        text={`+`}
        title={`Thêm tài khoản IOT`}
        handleFunc={async () => {
          const isExpand = await api.iotAccountAPI
            .add(idAgent, idWarehouse, username, password)
            .then(async (res) => {
              if (res.status === "Successfully") {
                const respond = await api.iotAccountAPI.get_all(
                  idAgent,
                  idWarehouse
                );
                if (respond.status === "Successfully") {
                  dispatch(setIotAccountList(respond.data));
                } else {
                  dispatch(setIotAccountList([]));
                }
                return false;
              } else {
                setIsErrorAccount(res.message);
                return true;
              }
            });
          return isExpand;
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
            value={username}
            onChange={(e) => {
              setIsErrorAccount("");
              setUsername(e.target.value);
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
          <Typography style={{ minWidth: "6rem" }}>Mật khẩu: </Typography>
          <TextField
            variant="standard"
            type="password"
            inputProps={{ style: { textAlign: "center" } }}
            sx={{ flex: 1 }}
            value={password}
            onChange={(e) => {
              setIsErrorAccount("");
              setPassword(e.target.value);
            }}
          />
        </Box>
        {isErrorAccount && <Typography>{`${isErrorAccount}!!!`}</Typography>}
      </AddDrawer>
    </>
  );
};

const SensorDetailPage = () => {
  const idAgent = useSelector((state) => state.agent.currentAgent);
  const idWarehouse = useSelector((state) => state.warehouse.currentWarehouse);
  const iotAccountList = useSelector(
    (state) => state.iotAccount.iotAccountList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (idWarehouse !== -1) {
      api.iotAccountAPI.get_all(idAgent, idWarehouse).then((data) => {
        if (data.status === "Successfully") {
          dispatch(setIotAccountList(data.data));
        } else {
          dispatch(setIotAccountList([]));
        }
      });
    }
  }, [idAgent, idWarehouse, dispatch]);

  if (idWarehouse === -1) {
    return <Navigate to="/agent" replace={true} />;
  }

  return (
    <>
      <AddIOTAccount idAgent={idAgent} idWarehouse={idWarehouse} />

      {iotAccountList.map((iotAccount, ind) => {
        return (
          <AccCustomize key={ind}>
            <AccSumaryCustomize
              title={iotAccount.iot_username}
              onUnConnect={() =>
                api.iotAccountAPI
                  .remove(idAgent, idWarehouse, iotAccount.iotAccount_id)
                  .then((res) => {
                    if (res.status === "Successfully") {
                      api.iotAccountAPI
                        .get_all(idAgent, idWarehouse)
                        .then((data) => {
                          if (data.status === "Successfully") {
                            dispatch(setIotAccountList(data.data));
                          } else {
                            dispatch(setIotAccountList([]));
                          }
                        });
                    } else {
                      console.log("Xu ly remove iot account khong thanh cong");
                    }
                  })
              }
            />
            <AccDetailscustomize>
              <GenerateSensorTable idIotAccount={iotAccount.iotAccount_id} />
            </AccDetailscustomize>
          </AccCustomize>
        );
      })}
    </>
  );
};

export default SensorDetailPage;
