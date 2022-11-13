import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAgentList, setCurrentAgent } from "../../../redux/agent";
import { setCurrentWarehouse } from "../../../redux/warehouse";
import { setDrawerTab, setExpandDrawer } from "../../../redux/drawer";
import * as api from "./../../../api";

const DeleteAgent = ({ data }) => {
  const id_agent = data[0];

  const currentAgent = useSelector((state) => state.agent.currentAgent);
  const agentList = useSelector((state) => state.agent.agentList);

  const agentReadyToDelete = agentList.filter(
    (agent) => agent._id === id_agent
  )[0];

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
          <Typography variant="h4">Xóa đại lý</Typography>

          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
              flex: 1,
            }}
          >
            <Typography style={{ minWidth: "7rem", marginTop: "1rem" }}>
              Xác nhận xóa đại lý "{agentReadyToDelete.agent_owner}"?
            </Typography>
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
              if (currentAgent === id_agent) {
                dispatch(setCurrentAgent(-1));
                dispatch(setCurrentWarehouse(-1));
              }
              await api.agentAPI.delete(id_agent);
              dispatch(setDrawerTab({ type: "", action: "", data: "" }));
              dispatch(setExpandDrawer(false));
              await api.agentAPI.get_all().then((data) => {
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

export default DeleteAgent;
