import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "./../../../api";
import { setDrawerTab, setExpandDrawer } from "../../../redux/drawer";
import { setAgentList } from "../../../redux/agent";

const AddAgent = () => {
  const company = useSelector((state) => state.user.company);
  const [agentReadyToAdd, setAgentReadyToAdd] = useState({
    agent_name: "",
    agent_owner: "",
  });

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
          <Typography variant="h4" sx={{ marginBottom: "1.5rem" }}>
            Thêm đại lý
          </Typography>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
              flex: 1,
            }}
          >
            <Typography style={{ minWidth: "7rem" }}>Tên công ty: </Typography>
            <TextField
              disabled
              variant="standard"
              inputProps={{ style: { textAlign: "center" } }}
              sx={{ flex: 1 }}
              value={`${company.company_name}`}
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
            <Typography style={{ minWidth: "7rem" }}>Tên đại lý: </Typography>
            <TextField
              variant="standard"
              inputProps={{ style: { textAlign: "center" } }}
              sx={{ flex: 1 }}
              value={`${agentReadyToAdd.agent_name}`}
              onChange={(e) => {
                setAgentReadyToAdd({
                  ...agentReadyToAdd,
                  agent_name: e.target.value,
                });
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
            <Typography style={{ minWidth: "7rem" }}>Chủ sở hữu: </Typography>
            <TextField
              variant="standard"
              inputProps={{ style: { textAlign: "center" } }}
              sx={{ flex: 1 }}
              value={`${agentReadyToAdd.agent_owner}`}
              onChange={(e) => {
                setAgentReadyToAdd({
                  ...agentReadyToAdd,
                  agent_owner: e.target.value,
                });
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
            Hủy
          </Button>
          <Button
            variant="outlined"
            onClick={async () => {
              //   await handleFunc();
              const res = await api.agentAPI.add(
                agentReadyToAdd.agent_name,
                agentReadyToAdd.agent_owner
              );
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
            Thêm
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AddAgent;
