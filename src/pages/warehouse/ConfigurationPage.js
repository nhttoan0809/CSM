import { Box } from "@mui/material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import CustomizeCanvas from "../../components/3D/CustomizeCanvas";
import WarehouseScene from "../../components/3D/WarehouseScene";
import { SIZE422, SIZE522, SIZE523 } from "../../constant/warehouse";

const WarehouseConfigurationPage = () => {
  const currentAgent = useSelector((state) => state.agent.currentAgent);
  const currentWarehouse = useSelector(
    (state) => state.warehouse.currentWarehouse
  );
  const agentList = useSelector((state) => state.agent.agentList);
  const warehouseList = useSelector((state) => state.warehouse.warehouseList);

  const warehouseInformation = useMemo(() => {
    if (currentAgent !== -1 && currentWarehouse !== -1) {
      const agent = agentList.filter((agent) => agent._id === currentAgent)[0];
      let warehouseInfor = warehouseList.filter(
        (warehouse) => warehouse.warehouse_id === currentWarehouse
      )[0];
      warehouseInfor = {
        ...warehouseInfor,
        owner: agent.agent_owner,
      };
      return warehouseInfor;
    }
  }, [currentWarehouse, currentAgent, warehouseList, agentList]);

  const warehouseSize = useMemo(() => {
    if (warehouseInformation) {
      const size = `${warehouseInformation.length}-${warehouseInformation.width}-${warehouseInformation.height}`;
      return size === SIZE522
        ? SIZE522
        : size === SIZE523
        ? SIZE523
        : size === SIZE422
        ? SIZE422
        : null;
    }
  }, [warehouseInformation]);

  // console.log("warehouseSize: ", warehouseSize);

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
            {/* <Pallet401534Scene
              warehouseSize={SIZE522}
              useCamera={false}
            /> */}
            {/* <Pallet601524Scene warehouseHeight={200} useCamera={false}/> */}
            {/* <Pallet601534Scene warehouseHeight={200} useCamera={false}/> */}
          </CustomizeCanvas>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            minWidth: "15rem",
          }}
        >
          Control Box
        </Box>
      </Box>
    </>
  );
};

export default WarehouseConfigurationPage;
