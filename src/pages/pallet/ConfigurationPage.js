import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  styled,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import CustomizeCanvas from "../../components/3D/CustomizeCanvas";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SIZE522, SIZE523, SIZE422 } from "../../constant/warehouse";
import WarehouseScene from "../../components/3D/WarehouseScene";
import Pallet401534Scene from "../../components/3D/Pallet401534Scene";
import Pallet601524Scene from "../../components/3D/Pallet601524Scene";
import Pallet601534Scene from "../../components/3D/Pallet601534Scene";
import { SIZE401534, SIZE601524, SIZE601534 } from "../../constant/pallet";

const Controler = ({ sx, title, onCancel, children }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 1,
        overflow: "hidden",
        background: "white",
        top: 0,
        ...sx,
      }}
    >
      <div
        style={{
          display: "flex",
          margin: ".5rem",
          justifyContent: "space-between",
          alignItems: "Center",
        }}
      >
        <h3 style={{ margin: 0 }}>{title}</h3>
        <Button size="small" variant="contained" onClick={onCancel}>
          X
        </Button>
        <Box>{children}</Box>
      </div>
    </Box>
  );
};

const PalletConfigurationPage = () => {
  const [isControll, setIsControll] = useState(true);

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
            {usedPalletList.length > 0 && (
              <>
                {usedPalletList.map((pallet, ind) => {
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
          </CustomizeCanvas>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            minWidth: "15rem",
            position: "relative",
          }}
        >
          <h5>Danh Sách Pallet</h5>
          <Controler
            sx={{ width: isControll ? "100%" : "0" }}
            title={`Điều khiển`}
            onCancel={() => {
              setIsControll(false);
            }}
          ></Controler>
          <Box sx={{ margin: ".5rem 1rem" }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Pallet đã sử dụng</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {usedPalletList.map((pallet, ind) => {
                  return (
                    <>
                      <p key={ind}>id: {pallet._id}</p>
                    </>
                  );
                })}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Pallet chưa sử dụng</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {unUsedPalletList.map((pallet, ind) => {
                  return (
                    <Box
                      key={ind}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <Button
                        onClick={() => {
                          setIsControll(true);
                        }}
                      >
                        id: {pallet._id}
                      </Button>
                      {/* <Controler /> */}
                    </Box>
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
