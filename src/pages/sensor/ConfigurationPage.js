import {
  Box,
  Button, InputLabel,
  Radio
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomizeCanvas from "../../components/3D/CustomizeCanvas";
import SensorScene from "../../components/3D/SensorScene";
import WarehouseScene from "../../components/3D/WarehouseScene";
import { SIZE422, SIZE522, SIZE523 } from "../../constant/warehouse";
import calAllSensorPos from "../../utilityFunc/calAllSensorPos";
import convertToFakeSenPos from "../../utilityFunc/convertToRealSenPos";
import fetchiotaccount from "../../utilityFunc/fetchiotaccount";
import * as api from "./../../api";

const UsedSensorButton = ({ sensor, state, sensorPosInWah, dataToSubmit }) => {
  const { demoUnUsedSensor, setDemoUnUsedSensor } = state;
  const dataToSubmitWithinSensor = useMemo(() => {
    const newData = { ...dataToSubmit };
    newData.id_sensor = sensor._id;
    return newData;
  }, [dataToSubmit]);

  const dispatch = useDispatch();

  // const oldSensor = useMemo(() => sensor, []);

  const [currentSensor, index, usedPosition] = useMemo(() => {
    let currentSensor = {};
    let index = null;
    if (demoUnUsedSensor.length > 0) {
      demoUnUsedSensor.forEach((sen, ind) => {
        if (sen._id === sensor._id) {
          currentSensor = { ...sen };
          index = ind;
        }
      });
    }
    const usedPosition = demoUnUsedSensor.map((sensor) => sensor.position);

    return [currentSensor, index, usedPosition];
  }, [demoUnUsedSensor]);

  if (Object.values(currentSensor).length > 0) {
    console.log("currentSensor: ", currentSensor);
  }

  const handleChange = (event) => {
    console.log("currentSensor: ", currentSensor);
    console.log("toggle: ", event.target.value);

    let newState = [...demoUnUsedSensor];
    let newCurrentSensor = { ...currentSensor };
    if (currentSensor.position) {
      if (currentSensor.position === event.target.value) {
        // delete newCurrentSensor.position;
      } else {
        newCurrentSensor.position = event.target.value;
      }
    } else {
      newCurrentSensor.position = event.target.value;
    }
    newState[index] = newCurrentSensor;
    setDemoUnUsedSensor(newState);
  };

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (!demoUnUsedSensor.some((sen) => sen._id === sensor._id)) {
      let newdemoUnUsedSensor = [...demoUnUsedSensor];
      newdemoUnUsedSensor.push(sensor);
      console.log("push sensor to list: ", sensor);
      setDemoUnUsedSensor(newdemoUnUsedSensor);
    }
  });

  return (
    <>
      <Button
        onClick={() => {
          if (!isSelected) {
            return setIsSelected(true);
          }
          const newDemoList = demoUnUsedSensor.map((sen) => {
            if (sen._id === sensor._id) {
              return { ...sensor };
            }
            return sen;
          });
          setIsSelected(false);
          setDemoUnUsedSensor(newDemoList);
        }}
      >
        Id cam bien: {sensor._id}
      </Button>
      {isSelected && sensorPosInWah && sensorPosInWah.length > 0 && (
        <>
          <>
            <InputLabel sx={{ textAlign: "left" }}>
              Vị trí: {currentSensor.position ?? "--/--/--"}
            </InputLabel>
            <div style={{ display: "flex" }}>
              {sensorPosInWah.map((pos, ind) => {
                const p = Object.values(pos);
                const isDisable =
                  usedPosition.filter(
                    (pos) => pos === `${p[0]}-${p[1]}-${p[2]}`
                  ).length > 0;
                return (
                  <div key={ind}>
                    <Radio
                      disabled={isDisable}
                      checked={
                        (currentSensor &&
                          currentSensor.position ===
                            `${p[0]}-${p[1]}-${p[2]}`) ??
                        false
                      }
                      size="small"
                      value={`${p[0]}-${p[1]}-${p[2]}`}
                      inputProps={{ "aria-label": `${p[0]}-${p[1]}-${p[2]}` }}
                      onChange={handleChange}
                    />
                  </div>
                );
              })}
            </div>
            <Button
              sx={{ marginRight: ".5rem" }}
              variant="outlined"
              color="error"
              onClick={() => {
                const {
                  id_agent,
                  id_warehouse,
                  id_iot_account,
                  id_station,
                  id_sensor,
                } = dataToSubmitWithinSensor;
                api.sensorAPI
                  .set_position(
                    id_agent,
                    id_warehouse,
                    id_iot_account,
                    id_station,
                    id_sensor,
                    "-1"
                  )
                  .then((res) => {
                    if (res.status === "Successfully") {
                      fetchiotaccount(id_agent, id_warehouse, dispatch);
                    }
                  });
              }}
            >
              Gỡ bỏ
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                const {
                  id_agent,
                  id_warehouse,
                  id_iot_account,
                  id_station,
                  id_sensor,
                } = dataToSubmitWithinSensor;
                api.sensorAPI
                  .set_position(
                    id_agent,
                    id_warehouse,
                    id_iot_account,
                    id_station,
                    id_sensor,
                    currentSensor.position
                  )
                  .then((res) => {
                    if (res.status === "Successfully") {
                      fetchiotaccount(id_agent, id_warehouse, dispatch);
                    }
                  });
              }}
            >
              Cập nhật
            </Button>
          </>
        </>
      )}
    </>
  );
};

const SensorButton = ({ sensor, state, sensorPosInWah, dataToSubmit }) => {
  const { demoUnUsedSensor, setDemoUnUsedSensor } = state;
  const dataToSubmitWithinSensor = useMemo(() => {
    const newData = { ...dataToSubmit };
    newData.id_sensor = sensor._id;
    return newData;
  }, [dataToSubmit]);

  const dispatch = useDispatch();

  const [currentSensor, index, usedPosition] = useMemo(() => {
    let currentSensor = {};
    let index = null;
    if (demoUnUsedSensor.length > 0) {
      demoUnUsedSensor.forEach((sen, ind) => {
        if (sen._id === sensor._id) {
          currentSensor = { ...sen };
          index = ind;
        }
      });
    }
    const usedPosition = demoUnUsedSensor.map((sensor) => sensor.position);

    return [currentSensor, index, usedPosition];
  }, [demoUnUsedSensor]);

  if (Object.values(currentSensor).length > 0) {
    console.log("currentSensor: ", currentSensor);
  }

  const handleChange = (event) => {
    console.log("currentSensor: ", currentSensor);
    console.log("toggle: ", event.target.value);

    let newState = [...demoUnUsedSensor];
    let newCurrentSensor = { ...currentSensor };
    if (currentSensor.position) {
      if (currentSensor.position === event.target.value) {
      } else {
        newCurrentSensor.position = event.target.value;
      }
    } else {
      newCurrentSensor.position = event.target.value;
    }
    newState[index] = newCurrentSensor;
    setDemoUnUsedSensor(newState);
  };

  const isSelected = useMemo(() => {
    return (
      demoUnUsedSensor.filter((tempSensor) => {
        return tempSensor._id === sensor._id;
      }).length > 0 ?? false
    );
  }, [demoUnUsedSensor]);

  return (
    <>
      <Button
        onClick={() => {
          let newDemoList = [...demoUnUsedSensor];
          if (isSelected) {
            console.log("execute clear sensor: ", sensor._id);
            newDemoList = newDemoList.filter((tempSensor) => {
              return tempSensor._id !== sensor._id;
            });
          } else {
            newDemoList.push({
              ...sensor,
            });
          }
          setDemoUnUsedSensor(newDemoList);
        }}
      >
        Id cam bien: {sensor._id}
      </Button>
      {isSelected && sensorPosInWah && sensorPosInWah.length > 0 && (
        <>
          <>
            <InputLabel sx={{ textAlign: "left" }}>
              Vị trí: {currentSensor.position ?? "--/--/--"}
            </InputLabel>
            <div style={{ display: "flex" }}>
              {sensorPosInWah.map((pos, ind) => {
                const p = Object.values(pos);
                const isDisable =
                  usedPosition.filter(
                    (pos) => pos === `${p[0]}-${p[1]}-${p[2]}`
                  ).length > 0;
                return (
                  <div key={ind}>
                    <Radio
                      disabled={isDisable}
                      checked={
                        (currentSensor &&
                          currentSensor.position ===
                            `${p[0]}-${p[1]}-${p[2]}`) ??
                        false
                      }
                      size="small"
                      value={`${p[0]}-${p[1]}-${p[2]}`}
                      inputProps={{ "aria-label": `${p[0]}-${p[1]}-${p[2]}` }}
                      onChange={handleChange}
                    />
                  </div>
                );
              })}
            </div>
            <Button
              variant="outlined"
              disabled={!currentSensor.position ?? false}
              onClick={() => {
                const {
                  id_agent,
                  id_warehouse,
                  id_iot_account,
                  id_station,
                  id_sensor,
                } = dataToSubmitWithinSensor;
                api.sensorAPI
                  .set_position(
                    id_agent,
                    id_warehouse,
                    id_iot_account,
                    id_station,
                    id_sensor,
                    currentSensor.position
                  )
                  .then((res) => {
                    if (res.status === "Successfully") {
                      fetchiotaccount(id_agent, id_warehouse, dispatch);
                    }
                  });
              }}
            >
              Thêm
            </Button>
          </>
        </>
      )}
    </>
  );
};

const UsedSensorAccordion = ({
  accounts,
  state,
  sensorPosInWah,
  dataToSubmit,
}) => {
  return (
    <>
      {accounts.length > 0 && (
        <>
          {accounts.map((account, ind) => {
            const dataSubmitWithinAccount = { ...dataToSubmit };
            dataSubmitWithinAccount.id_iot_account = account.iotAccount_id;
            return (
              <Box key={ind}>
                <p style={{ fontWeight: "bolder", textAlign: "left" }}>
                  Tai khoan: {account.iot_username}
                </p>
                {account.stationList.map((station, ind) => {
                  const dataSubmitWithinStation = {
                    ...dataSubmitWithinAccount,
                  };
                  dataSubmitWithinStation.id_station = station._id;
                  return (
                    <Box key={ind}>
                      <p
                        style={{ textDecoration: "underline" }}
                      >{`Tram: ${station._id}`}</p>
                      <UsedSensorButton
                        sensor={station.sensorList[0]}
                        state={state}
                        sensorPosInWah={sensorPosInWah}
                        dataToSubmit={dataSubmitWithinStation}
                      />
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </>
      )}
    </>
  );
};

const UnUsedSensorAccordion = ({
  accounts,
  state,
  sensorPosInWah,
  dataToSubmit,
  // demoUnUsedSensor,
}) => {
  return (
    <>
      {accounts.length > 0 && (
        <>
          {accounts.map((account, ind) => {
            const dataSubmitWithinAccount = { ...dataToSubmit };
            dataSubmitWithinAccount.id_iot_account = account.iotAccount_id;
            return (
              <Box key={ind}>
                <p style={{ fontWeight: "bolder", textAlign: "left" }}>
                  Tai khoan: {account.iot_username}
                </p>
                {account.stationList.map((station, ind) => {
                  const dataSubmitWithinStation = {
                    ...dataSubmitWithinAccount,
                  };
                  dataSubmitWithinStation.id_station = station._id;
                  return (
                    <Box key={ind}>
                      <p
                        style={{ textDecoration: "underline" }}
                      >{`Tram: ${station._id}`}</p>
                      <SensorButton
                        sensor={station.sensorList[0]}
                        state={state}
                        sensorPosInWah={sensorPosInWah}
                        dataToSubmit={dataSubmitWithinStation}
                      />
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </>
      )}
    </>
  );
};

const SensorConfigurationPage = () => {
  const currentAgent = useSelector((state) => state.agent.currentAgent);
  const currentWarehouse = useSelector(
    (state) => state.warehouse.currentWarehouse
  );
  const agentList = useSelector((state) => state.agent.agentList);
  const warehouseList = useSelector((state) => state.warehouse.warehouseList);const iotAccountList = useSelector(
    (state) => state.iotAccount.iotAccountList
  );

  const [demoUnUsedSensor, setDemoUnUsedSensor] = useState([]);

  useEffect(() => {
    setDemoUnUsedSensor([]);
  }, [iotAccountList]);

  const warehouseInformation = useMemo(() => {
    if (currentAgent !== -1 && currentWarehouse !== -1) {
      return warehouseList.filter(
        (warehouse) => warehouse.warehouse_id === currentWarehouse
      )[0];
    }
    return null;
  }, [currentWarehouse, currentAgent, warehouseList, agentList]);

  const [warehouseSize, sensorPosInWah] = useMemo(() => {
    let warehouseSize = null;
    let sensorPosInWah = [];
    if (warehouseInformation) {
      const size = `${warehouseInformation.length}-${warehouseInformation.width}-${warehouseInformation.height}`;
      if ([SIZE522, SIZE523, SIZE422].includes(size)) {
        warehouseSize = size;
      }

      sensorPosInWah = calAllSensorPos({
        length: warehouseInformation.length,
        width: warehouseInformation.width,
        height: warehouseInformation.height,
      });
    }
    return [warehouseSize, sensorPosInWah];
  }, [warehouseInformation]);

  const [accountWithUsedSensor, accountWithUnUsedSensor] = useMemo(() => {
    if (!iotAccountList || iotAccountList.length === 0) return [[], []];
    const accountWithUsedSensor = [];
    const accountWithUnUsedSensor = [];
    iotAccountList.forEach((account) => {
      const UstationList = [];
      const RstationList = [];

      if (account.stationList && account.stationList.length > 0) {
        account.stationList.forEach((station) => {
          const USensorList = !station.sensorList
            ? []
            : station.sensorList.filter(
                (sensor) => sensor.status === true && sensor.position
              );
          const RSensorList = !station.sensorList
            ? []
            : station.sensorList.filter(
                (sensor) => sensor.status === true && !sensor.position
              );
          if (USensorList.length > 0) {
            UstationList.push({
              ...station,
              sensorList: USensorList,
            });
          }
          if (RSensorList.length > 0) {
            RstationList.push({
              ...station,
              sensorList: RSensorList,
            });
          }
        });
      }

      if (UstationList.length > 0) {
        accountWithUsedSensor.push({
          ...account,
          stationList: UstationList,
        });
      }
      if (RstationList.length > 0) {
        accountWithUnUsedSensor.push({
          ...account,
          stationList: RstationList,
        });
      }
    });

    return [accountWithUsedSensor, accountWithUnUsedSensor];
  }, [iotAccountList]);

  const dataToSubmit = useMemo(() => {
    return {
      id_agent: currentAgent,
      id_warehouse: currentWarehouse,
    };
  }, [currentAgent, currentWarehouse, iotAccountList]);

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
            {warehouseSize && (
              <WarehouseScene warehouseSize={warehouseSize} useCamera={true} />
            )}
            {demoUnUsedSensor.filter((s) => s.position).length > 0 && (
              <>
                {demoUnUsedSensor
                  .filter((s) => s.position)
                  .map((s) => ({
                    ...s,
                    position: convertToFakeSenPos(s.position),
                  }))
                  .map((sensor, ind) => (
                    <SensorScene
                      key={ind}
                      warehouseSize={warehouseSize}
                      sensor={sensor}
                    />
                  ))}
              </>
            )}
            <directionalLight color="white" position={[0, 0, 1]} />
            <directionalLight color="white" position={[1, 0, 0]} />
            <directionalLight color="white" position={[-1, 0, 0]} />
            <directionalLight color="white" position={[0, 0, -1]} />
            <directionalLight color="white" position={[0, 1, 0]} />
            <directionalLight color="white" position={[0, -1, 0]} />
          </CustomizeCanvas>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            minWidth: "20rem",
            position: "relative",
            height: "70vh",
            overflow: "scroll",
            maxWidth: "27rem",
          }}
        >
          <h4>Danh sách cảm biến đang sử dụng</h4>
          <Box sx={{ margin: ".5rem 1rem 4rem" }}>
            <UsedSensorAccordion
              accounts={accountWithUsedSensor}
              state={{ demoUnUsedSensor, setDemoUnUsedSensor }}
              sensorPosInWah={sensorPosInWah}
              dataToSubmit={dataToSubmit}
            />
          </Box>
          <h4>Danh sách cảm biến chưa được sử dụng</h4>
          <Box sx={{ margin: ".5rem 1rem" }}>
            <UnUsedSensorAccordion
              accounts={accountWithUnUsedSensor}
              state={{ demoUnUsedSensor, setDemoUnUsedSensor }}
              sensorPosInWah={sensorPosInWah}
              dataToSubmit={dataToSubmit}
              // demoUnUsedSensor={demoUnUsedSensor}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SensorConfigurationPage;
