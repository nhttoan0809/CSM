import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "./../../../api";
import { setDrawerTab, setExpandDrawer } from "../../../redux/drawer";
import { setAgentList } from "../../../redux/agent";
import MultipleSelectCheckmarks from "../../MultiSelec";
import warehouse from "../../../redux/warehouse";

const DeleteWarehouse = ({ data }) => {
  const id_agent = data[0];

  const agentList = useSelector((state) => state.agent.agentList);
  const agentSelected = agentList.filter((agent) => agent._id === id_agent)[0];

  const [warehouseSelectedList, setWarehouseSelectedList] = useState([]);

  useEffect(() => {
    api.warehouseAPI
      .get_all(id_agent)
      .then((warehouse) =>
        warehouse.data.map((warehouse) => ({
          name: warehouse.name,
          warehouse_id: warehouse.warehouse_id,
        }))
      )
      .then((warehouseList) => {
        setWarehouseSelectedList(warehouseList);
      });
  }, [id_agent]);
  const dispatch = useDispatch();

  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

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
            Xóa kho
          </Typography>

          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
              flex: 1,
            }}
          >
            <Typography style={{ minWidth: "3rem" }}>Tên kho: </Typography>
            <MultipleSelectCheckmarks
              names={warehouseSelectedList}
              personName={personName}
              handleChange={handleChange}
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
              const Promises = personName.map(async (id_warehouse) => {
                return await api.warehouseAPI.delete(id_agent, id_warehouse);
              });

              const res = await Promise.all(Promises);
              console.log('res: ', res)
              dispatch(setDrawerTab({ type: "", action: "", data: "" }));
              dispatch(setExpandDrawer(false));
              api.agentAPI.get_all().then((data) => {
                if (data.status === "Successfully") {
                  dispatch(setAgentList(data.data));
                } else {
                  dispatch(setAgentList([]));
                }
              });
            }}
          >
            Xóa
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default DeleteWarehouse;
