import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Slider,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomizeCanvas from "../../components/3D/CustomizeCanvas";
import Pallet401534Scene from "../../components/3D/Pallet401534Scene";
import Pallet601524Scene from "../../components/3D/Pallet601524Scene";
import Pallet601534Scene from "../../components/3D/Pallet601534Scene";
import WarehouseScene from "../../components/3D/WarehouseScene";
import { SIZE401534, SIZE601524, SIZE601534 } from "../../constant/pallet";
import { SIZE422, SIZE522, SIZE523 } from "../../constant/warehouse";
import { setPalletList } from "../../redux/pallet";
import convertPosToReaclPos from "../../utilityFunc/convertPosToReaclPos";
import * as api from "./../../api";

const UpdatePositionComp = ({
  pallet,
  ind,
  palletList,
  warehouseSize,
  resetPalletList,
  paramsToUpdate,
}) => {
  const [enable, setEnable] = useState(false);
  const [pushMessage, setPushMessage] = useState(false);
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.product.productList);
  const isDisabled = useMemo(() => {
    return (
      productList.filter((product) => product.pallet_id === pallet._id).length >
        0 ?? false
    );
  }, [pallet, productList]);

  useEffect(() => {
    if (pushMessage) {
      setTimeout(() => {
        setPushMessage(false);
      }, 5000);
    }
  }, [pushMessage]);

  return (
    <>
      <Button
        sx={{ fontSize: ".85rem" }}
        onClick={() => {
          if (!enable) {
            setEnable(true);
          } else {
            let newPalletList = [...palletList];
            newPalletList[ind].position = newPalletList[ind].originalPosition;
            resetPalletList(newPalletList);
            setEnable(false);
          }
        }}
      >
        id: {pallet._id}
      </Button>
      {enable && (
        <Box sx={{ padding: "0 .5rem", marginBottom: "1rem" }}>
          Toa do diem X: {convertPosToReaclPos(pallet.position)[0]}
          <Slider
            // sx={{ marginX: "2rem" }}
            value={convertPosToReaclPos(pallet.position)[0]}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={convertPosToReaclPos(warehouseSize)[0] - pallet.length}
            onChange={(event) => {
              let newPalletList = [...palletList];
              newPalletList[ind].position = `${event.target.value}-${
                convertPosToReaclPos(pallet.position)[1]
              }-${convertPosToReaclPos(pallet.position)[2]}`;
              resetPalletList(newPalletList);
            }}
          />
          Toa do diem Z: {convertPosToReaclPos(pallet.position)[1]}
          <Slider
            // sx={{ marginX: "2rem" }}
            value={convertPosToReaclPos(pallet.position)[1]}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={convertPosToReaclPos(warehouseSize)[2] - pallet.width}
            onChange={(event) => {
              let newPalletList = [...palletList];
              newPalletList[ind].position = `${
                convertPosToReaclPos(pallet.position)[0]
              }-${event.target.value}-${
                convertPosToReaclPos(pallet.position)[2]
              }`;
              resetPalletList(newPalletList);
            }}
          />
          <Button
            disabled={isDisabled}
            sx={{ margin: "0 .2rem" }}
            variant="contained"
            color="error"
            onClick={async () => {
              const res = await api.palletAPI.remove_from_warehouse(
                paramsToUpdate.id_agent,
                paramsToUpdate.id_warehouse,
                paramsToUpdate.id_pallet
              );
              if (res.status === "Successfully") {
                api.palletAPI
                  .get_all(paramsToUpdate.id_agent, paramsToUpdate.id_warehouse)
                  .then((data) => {
                    if (data.status === "Successfully") {
                      dispatch(setPalletList(data.data));
                    } else {
                      dispatch(setPalletList([]));
                    }
                  });
              } else {
                console.log("failure");
              }
            }}
          >
            Go pallet
          </Button>
          <Button
            // size="small"
            sx={{ margin: "0 .2rem" }}
            variant="outlined"
            onClick={async () => {
              const position = `${convertPosToReaclPos(pallet.position)[0]}-${
                convertPosToReaclPos(pallet.position)[1]
              }-${convertPosToReaclPos(pallet.position)[2]}`;
              const res = await api.palletAPI.update_position(
                paramsToUpdate.id_agent,
                paramsToUpdate.id_warehouse,
                paramsToUpdate.id_pallet,
                position
              );
              if (res.status === "Successfully") {
                api.palletAPI
                  .get_all(paramsToUpdate.id_agent, paramsToUpdate.id_warehouse)
                  .then((data) => {
                    if (data.status === "Successfully") {
                      dispatch(setPalletList(data.data));
                      setPushMessage(true);
                    } else {
                      dispatch(setPalletList([]));
                    }
                  });
              } else {
                console.log("failure");
              }
            }}
          >
            Cap nhat
          </Button>
          {pushMessage && (
            <Alert sx={{ marginTop: ".5rem" }} severity="success">
              Cap nhat thanh cong!!!
            </Alert>
          )}
        </Box>
      )}
    </>
  );
};

const SetupPositionComp = ({
  pallet,
  ind,
  palletList,
  warehouseSize,
  resetPalletList,
  addToDeMo,
  paramsToAdd,
}) => {
  const [enable, setEnable] = useState(false);
  // const [pushMessage, setPushMessage] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <Button
        sx={{ fontSize: ".85rem" }}
        onClick={() => {
          if (!enable) {
            let newPalletList = [...palletList];
            newPalletList[ind].position = `0-0-0`;
            newPalletList[ind].is_used = true;
            addToDeMo(newPalletList);
            setEnable(true);
          } else {
            let newPalletList = [...palletList];
            delete newPalletList[ind].position;
            delete newPalletList[ind].is_used;
            resetPalletList(newPalletList);
            setEnable(false);
          }
        }}
      >
        id: {pallet._id}
      </Button>
      {enable && (
        <Box sx={{ padding: "0 .5rem", marginBottom: "1rem" }}>
          {pallet.position && (
            <>
              Toa do diem X: {convertPosToReaclPos(pallet.position)[0]}
              <Slider
                // sx={{ marginX: "2rem" }}
                value={convertPosToReaclPos(pallet.position)[0]}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={convertPosToReaclPos(warehouseSize)[0] - pallet.length}
                onChange={(event) => {
                  let newPalletList = [...palletList];
                  newPalletList[ind].position = `${event.target.value}-${
                    convertPosToReaclPos(pallet.position)[1]
                  }-${convertPosToReaclPos(pallet.position)[2]}`;
                  resetPalletList(newPalletList);
                }}
              />
              Toa do diem Z: {convertPosToReaclPos(pallet.position)[1]}
              <Slider
                // sx={{ marginX: "2rem" }}
                value={convertPosToReaclPos(pallet.position)[1]}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={convertPosToReaclPos(warehouseSize)[2] - pallet.width}
                onChange={(event) => {
                  let newPalletList = [...palletList];
                  newPalletList[ind].position = `${
                    convertPosToReaclPos(pallet.position)[0]
                  }-${event.target.value}-${
                    convertPosToReaclPos(pallet.position)[2]
                  }`;
                  resetPalletList(newPalletList);
                }}
              />
              <Button
                variant="outlined"
                onClick={async () => {
                  const position = `${
                    convertPosToReaclPos(pallet.position)[0]
                  }-${convertPosToReaclPos(pallet.position)[1]}-${
                    convertPosToReaclPos(pallet.position)[2]
                  }`;
                  const res = await api.palletAPI.add_to_warehouse(
                    paramsToAdd.id_agent,
                    paramsToAdd.id_warehouse,
                    paramsToAdd.id_pallet,
                    position
                  );
                  if (res.status === "Successfully") {
                    api.palletAPI
                      .get_all(paramsToAdd.id_agent, paramsToAdd.id_warehouse)
                      .then((data) => {
                        if (data.status === "Successfully") {
                          dispatch(setPalletList(data.data));
                        } else {
                          dispatch(setPalletList([]));
                        }
                      });
                  } else {
                    console.log("failure");
                  }
                }}
              >
                Them pallet
              </Button>
              {/* {pushMessage && (
                <Alert sx={{ marginTop: ".5rem" }} severity="success">
                  Them pallet thanh cong!!!
                </Alert>
              )} */}
            </>
          )}
        </Box>
      )}
    </>
  );
};

const PalletConfigurationPage = () => {
  const currentAgent = useSelector((state) => state.agent.currentAgent);
  const currentWarehouse = useSelector(
    (state) => state.warehouse.currentWarehouse
  );
  const agentList = useSelector((state) => state.agent.agentList);
  const warehouseList = useSelector((state) => state.warehouse.warehouseList);
  const palletList = useSelector((state) => state.pallet.palletList);
  const palletTemplateList = useSelector(
    (state) => state.pallet_template.palletTemplateList
  );

  const warehouseInformation = useMemo(() => {
    if (currentAgent !== -1 && currentWarehouse !== -1) {
      return warehouseList.filter(
        (warehouse) => warehouse.warehouse_id === currentWarehouse
      )[0];
    }
    return null;
  }, [currentWarehouse, currentAgent, warehouseList, agentList]);

  const warehouseSize = useMemo(() => {
    if (warehouseInformation) {
      const size = `${warehouseInformation.length}-${warehouseInformation.width}-${warehouseInformation.height}`;
      if ([SIZE522, SIZE523, SIZE422].includes(size)) {
        return size;
      }
      return null;
    }
    return null;
  }, [warehouseInformation]);

  const palletListWithSize = useMemo(() => {
    if (palletList.length === 0) {
      return [];
    }
    let newPalletList = [...palletList];
    newPalletList = newPalletList.map((pallet) => {
      const palletTemplate = palletTemplateList.filter((palletTemplate) => {
        return palletTemplate._id === pallet.pallet_template_id;
      })[0];
      return {
        ...pallet,
        length: palletTemplate.length,
        width: palletTemplate.width,
        height: palletTemplate.height,
      };
    });
    return newPalletList;
  }, [palletList, palletTemplateList]);

  const [usedPalletList, unUsedPalletList] = useMemo(() => {
    if (palletListWithSize.length === 0) {
      return [[], []];
    }
    const usedList = palletListWithSize.filter(
      (pallet) => pallet.is_used === true
    );
    const unUsedList = palletListWithSize.filter(
      (pallet) => pallet.is_used !== true
    );
    return [usedList, unUsedList];
  }, [palletListWithSize]);

  const [tempUsedPalletList, setTempUsedPalletList] = useState([]);
  const [tempUnUsedPalletList, setTempUnUsedPalletList] = useState([]);
  // const [demoPallet, setDemoPallet] = useState([]);

  useEffect(() => {
    setTempUsedPalletList([]);
    setTempUnUsedPalletList([]);
  }, [currentWarehouse]);

  useEffect(() => {
    setTempUsedPalletList(
      usedPalletList.map((pallet) => ({
        ...pallet,
        originalPosition: pallet.position,
      }))
    );
  }, [usedPalletList]);

  useEffect(() => {
    setTempUnUsedPalletList(unUsedPalletList);
  }, [unUsedPalletList]);

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
            {tempUsedPalletList.length > 0 && (
              <>
                {tempUsedPalletList
                  .filter((p) => p.is_used && p.position)
                  .map((pallet, ind) => {
                    const type = `${pallet.length}-${pallet.width}-${pallet.height}`;
                    switch (type) {
                      case SIZE401534:
                        return (
                          <Pallet401534Scene
                            key={ind}
                            warehouseSize={warehouseSize}
                            useCamera={false}
                            positionPallet={pallet.position}
                          />
                        );
                      case SIZE601524:
                        return (
                          <Pallet601524Scene
                            key={ind}
                            warehouseSize={warehouseSize}
                            useCamera={false}
                            positionPallet={pallet.position}
                          />
                        );
                      case SIZE601534:
                        return (
                          <Pallet601534Scene
                            key={ind}
                            warehouseSize={warehouseSize}
                            useCamera={false}
                            positionPallet={pallet.position}
                          />
                        );
                      default:
                        return <></>;
                    }
                  })}
              </>
            )}
            {tempUnUsedPalletList.length > 0 && (
              <>
                {tempUnUsedPalletList
                  .filter((p) => p.is_used && p.position)
                  .map((pallet, ind) => {
                    const type = `${pallet.length}-${pallet.width}-${pallet.height}`;
                    switch (type) {
                      case SIZE401534:
                        return (
                          <Pallet401534Scene
                            key={ind}
                            warehouseSize={warehouseSize}
                            useCamera={false}
                            positionPallet={pallet.position}
                          />
                        );
                      case SIZE601524:
                        return (
                          <Pallet601524Scene
                            key={ind}
                            warehouseSize={warehouseSize}
                            useCamera={false}
                            positionPallet={pallet.position}
                          />
                        );
                      case SIZE601534:
                        return (
                          <Pallet601534Scene
                            key={ind}
                            warehouseSize={warehouseSize}
                            useCamera={false}
                            positionPallet={pallet.position}
                          />
                        );
                      default:
                        return <></>;
                    }
                  })}
              </>
            )}

            <directionalLight color="white" position={[0, 0, 5]} />
            <directionalLight color="white" position={[5, 0, 0]} />
            <directionalLight color="white" position={[-5, 0, 0]} />
            <directionalLight color="white" position={[0, 0, -5]} />
            <directionalLight color="white" position={[0, 5, 0]} />
            <directionalLight color="white" position={[0, -5, 0]} />
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
          <h5>Danh Sách Pallet</h5>
          <Box sx={{ margin: ".5rem 1rem" }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Pallet đã sử dụng</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* {console.log("tempUsedPalletList: ", tempUsedPalletList)} */}
                {tempUsedPalletList.map((pallet, ind, palletList) => {
                  return (
                    <div key={ind}>
                      <UpdatePositionComp
                        pallet={pallet}
                        ind={ind}
                        palletList={palletList}
                        warehouseSize={warehouseSize}
                        resetPalletList={(newPalletList) => {
                          setTempUsedPalletList(newPalletList);
                        }}
                        paramsToUpdate={{
                          id_agent: currentAgent,
                          id_warehouse: currentWarehouse,
                          id_pallet: pallet._id,
                        }}
                      />
                    </div>
                  );
                  // return (
                  //   <>
                  //     <Button>id: {pallet._id}</Button>
                  //     Toa do diem X: {convertPosToReaclPos(pallet.position)[0]}
                  //     <Slider
                  //       sx={{ marginX: "2rem" }}
                  //       value={convertPosToReaclPos(pallet.position)[0]}
                  //       valueLabelDisplay="auto"
                  //       step={1}
                  //       marks
                  //       min={0}
                  //       max={
                  //         convertPosToReaclPos(warehouseSize)[0] - pallet.length
                  //       }
                  //       onChange={(event) => {
                  //         let newPalletList = [...tempUsedPalletList];
                  //         newPalletList[ind].position = `${
                  //           event.target.value
                  //         }-${convertPosToReaclPos(pallet.position)[1]}-${
                  //           convertPosToReaclPos(pallet.position)[2]
                  //         }`;
                  //         setTempUsedPalletList(newPalletList);
                  //       }}
                  //     />
                  //     Toa do diem Z: {convertPosToReaclPos(pallet.position)[1]}
                  //     <Slider
                  //       sx={{ marginX: "2rem" }}
                  //       value={convertPosToReaclPos(pallet.position)[1]}
                  //       valueLabelDisplay="auto"
                  //       step={1}
                  //       marks
                  //       min={0}
                  //       max={
                  //         convertPosToReaclPos(warehouseSize)[2] - pallet.width
                  //       }
                  //       onChange={(event) => {
                  //         let newPalletList = [...tempUsedPalletList];
                  //         newPalletList[ind].position = `
                  //         ${convertPosToReaclPos(pallet.position)[0]}-${
                  //           event.target.value
                  //         }-${convertPosToReaclPos(pallet.position)[2]}`;
                  //         setTempUsedPalletList(newPalletList);
                  //       }}
                  //     />
                  //   </>
                  // );
                })}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Pallet chưa sử dụng</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {tempUnUsedPalletList.map((pallet, ind, palletList) => {
                  return (
                    <div key={ind}>
                      <SetupPositionComp
                        pallet={pallet}
                        ind={ind}
                        palletList={palletList}
                        warehouseSize={warehouseSize}
                        resetPalletList={(newPalletList) => {
                          setTempUnUsedPalletList(newPalletList);
                        }}
                        addToDeMo={(newPalletList) => {
                          setTempUnUsedPalletList(newPalletList);
                        }}
                        paramsToAdd={{
                          id_agent: currentAgent,
                          id_warehouse: currentWarehouse,
                          id_pallet: pallet._id,
                        }}
                      />
                    </div>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PalletConfigurationPage;
