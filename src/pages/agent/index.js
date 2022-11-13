import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EnhancedTable from "../../components/Table";
import { setAgentList } from "../../redux/agent";
import { setCurrentTab } from "../../redux/tabs";
import * as api from "./../../api";

const headCells = [
  {
    id: "_id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "agent_name",
    numeric: false,
    disablePadding: false,
    label: "Tên đại lý",
  },
  {
    id: "agent_owner",
    numeric: false,
    disablePadding: false,
    label: "Chủ sở hữu",
  },
  {
    id: "quantity",
    numeric: false,
    disablePadding: false,
    label: "Số lượng kho",
  },
];

const addWarehouseListToEveryAgent = async (agentList) => {
  const newAgentListPromise = agentList.map(async (agent) => {
    let warehouseList = await api.warehouseAPI
      .get_all(agent._id)
      .then((res) => res.data);

    const newAgent = {
      ...agent,
      quantity: warehouseList.length,
      // warehouseList.map((warehouse) => ({
      //   warehouse_id: warehouse.warehouse_id,
      //   name: warehouse.name,
      // })),
    };

    return newAgent;
  });
  return await Promise.all(newAgentListPromise);
};

const convertAgentToRowsData = async (agentList) => {
  agentList = await addWarehouseListToEveryAgent([...agentList]);

  const keys = headCells.map((cell) => cell.id);

  const data = agentList.map((agent) => {
    let newAgent = {};
    keys.forEach((key) => {
      newAgent[key] = agent[key];
    });
    return newAgent;
  });

  return data;
};

const AgentPage = () => {
  const agentList = useSelector((state) => state.agent.agentList);
  const [agentListConverted, setAgentListConverted] = useState(agentList);

  const dispatch = useDispatch();

  useEffect(() => {
    api.agentAPI.get_all().then((data) => {
      if (data.status === "Successfully") {
        dispatch(setAgentList(data.data));
      } else {
        dispatch(setAgentList([]));
      }
    });
  }, []);

  useEffect(() => {
    dispatch(setCurrentTab("agent"));
  }, []);

  useEffect(() => {
    load();

    async function load() {
      const res = await convertAgentToRowsData(agentList);
      setAgentListConverted(res);
    }
  }, [agentList]);

  return (
    <>
      {/* Title */}
      <Typography variant="h3" sx={{ marginBottom: "1rem" }}>
        Đại lý
      </Typography>

      <Box
        sx={{ width: "100%", padding: "0 1.5rem 0 1rem", marginTop: "1rem" }}
      >
        {agentList.length > 0 ? (
          <EnhancedTable
            title={{ id: `Agent`, name: `Dai ly` }}
            headCells={headCells}
            rows={agentListConverted}
          />
        ) : (
          <h3 style={{ width: "100%" }}>Không có sẵn đại lý !!!</h3>
        )}
      </Box>
    </>
  );
};

export default AgentPage;
