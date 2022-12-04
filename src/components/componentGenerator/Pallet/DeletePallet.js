import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setDrawerTab, setExpandDrawer } from "../../../redux/drawer";
import * as api from "./../../../api";

const TextFieldCustomized = styled((props) => {
  return <TextField variant="outlined" {...props}></TextField>;
})(() => ({
  margin: "10px 0",
}));

const isWarning = (newPalletList) => {
  let isWarning = false;
  newPalletList.forEach((pallet) => {
    if (pallet.is_used) {
      isWarning = true;
    }
  });
  return isWarning;
};

const DeletePallet = (props) => {
  const agent_id = useSelector((state) => state.agent.currentAgent);
  const warehouse_id = useSelector((state) => state.warehouse.currentWarehouse);
  const palletList = useSelector((state) => state.pallet.palletList);

  const id_ObjectList = props.data;
  const newPalletList = [];

  id_ObjectList.forEach((id) => {
    newPalletList.push(palletList.filter((pallet) => pallet._id === id)[0]);
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          {newPalletList.map((pallet, index) => (
            <Box key={index} sx={{ marginBottom: "1.5rem" }}>
              <Typography variant="h5">ID: {pallet._id}</Typography>
              <TextFieldCustomized
                variant="standard"
                label="Trang thai"
                color="warning"
                error={pallet.is_used ? true : false}
                disabled
                value={pallet.is_used ? "Dang su dung" : "Co san"}
                helperText={
                  pallet.is_used
                    ? "Pallet dang duoc su dung, khong the xoa"
                    : ""
                }
              />
            </Box>
          ))}
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
            Huy
          </Button>
          <Button
            disabled={isWarning(newPalletList)}
            variant="outlined"
            // color={isWarning(newPalletList) ? "warning" : "success"}
            onClick={() => {
              newPalletList.forEach(async (pallet) => {
                let isError = false;

                await api.palletAPI
                  .deleta_pallet(agent_id, warehouse_id, pallet._id)
                  .then((data) => {
                    if (data.status === "Successfully") {
                    } else {
                      isError = true;
                      // Handle update fail
                    }
                  });
              });
              dispatch(setDrawerTab({ type: "", action: "", data: "" }));
              dispatch(setExpandDrawer(false));
              navigate("/pallet");
            }}
          >
            Xoa
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default DeletePallet;
