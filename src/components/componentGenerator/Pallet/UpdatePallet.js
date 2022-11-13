import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDrawerTab, setExpandDrawer } from "../../../redux/drawer";
import * as api from './../../../api'

const TextFieldCustomized = styled((props) => {
  return <TextField variant="outlined" {...props}></TextField>;
})(() => ({
  margin: "10px 0",
}));

const UpdatePallet = (props) => {

  const AgentList = useSelector((state) => state.agent.agentList);
  const warehouseList = useSelector((state) => state.warehouse.warehouseList);
  const agent_id = useSelector(state => state.agent.currentAgent);
  const warehouse_id = useSelector(state => state.warehouse.currentWarehouse);
  const palletList = useSelector((state) => state.pallet.palletList);

  const id_Object = props.data[0];
  const pallet = palletList.filter(
    (pallet) => pallet._id === id_Object
  )[0];

  const [submitPallet, setSubmitPallet] = useState(pallet);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      {/* {console.log("pallet: ", pallet)} */}
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
          <Typography variant="h6">ID: {submitPallet._id}</Typography>
          <TextFieldCustomized
            disabled
            label="Dai ly"
            value={
              AgentList.filter((agent) => agent._id === agent_id)[0].agent_name
            }
          />
          <TextFieldCustomized
            disabled
            label="Kho"
            value={
              warehouseList.filter(
                (warehouse) => warehouse.warehouse_id === warehouse_id
              )[0].name
            }
          />
          <TextFieldCustomized
            disabled
            label="ID pallet mau"
            value={submitPallet.pallet_template_id}
          />
          <TextFieldCustomized
            label="Mo ta"
            value={submitPallet.description}
            onChange={(event) => {
              setSubmitPallet({...submitPallet, description: event.target.value})
            }}
          />
          <TextFieldCustomized
            disabled
            label="Trang thai"
            value={submitPallet.is_used}
          />
          <TextFieldCustomized
            disabled
            label="Ngay nhap"
            value={submitPallet.import_date}
          />
          <TextFieldCustomized
            disabled
            label="Ngay SD"
            value={submitPallet.storage_start_date}
          />
          <TextFieldCustomized
            disabled
            label="Vi tri"
            value={submitPallet.position}
          />
        </Box>
        <Box
          sx={{ margin: "1rem", display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            sx={{marginRight: '1rem'}}
            variant="outlined"
            onClick={() => {
              dispatch(setDrawerTab({ type: "", action: "", data: "" }));
              dispatch(setExpandDrawer(false));
            }}
          >
            Huy
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              api.palletAPI.update_information(agent_id, warehouse_id, submitPallet._id, submitPallet.description)
                .then(data => {
                  if(data.status === "Successfully"){
                    dispatch(setDrawerTab({ type: "", action: "", data: "" }));
                    dispatch(setExpandDrawer(false));
                    navigate('/pallet');
                  }else{
                    // Handle update fail
                  }
                })
            }}
          >
            Cap Nhat
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UpdatePallet;
