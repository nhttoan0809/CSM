import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerTab, setExpandDrawer } from "../../../redux/drawer";

const TextFieldCustomized = styled((props) => {
  return <TextField variant="outlined" {...props}></TextField>;
})(() => ({
  margin: "10px 0",
}));

const UpdatePallet = (props) => {
  const id_Object = props.data[0];
  const palletList = useSelector((state) => state.pallet.palletList);
  const pallet = palletList.filter(
    (pallet) => pallet.pallet_id === id_Object
  )[0];

  const [submitPallet, setSubmitPallet] = useState(pallet);

  // console.log("data: ", submitPallet);

  const dispatch = useDispatch();

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
          <Typography variant="h4">{submitPallet.pallet_id}</Typography>
          <TextFieldCustomized
            disabled
            label="ID Kho"
            value={submitPallet.warehouse_id}
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
            value={submitPallet.storage_start_data}
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
            variant="outlined"
            onClick={() => {
              dispatch(setDrawerTab({ type: "", action: "", data: "" }));
              dispatch(setExpandDrawer(false));
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UpdatePallet;
