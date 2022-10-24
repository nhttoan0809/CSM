import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerTab, setExpandDrawer } from "../../../redux/drawer";

const TextFieldCustomized = styled((props) => {
  return <TextField variant="outlined" {...props}></TextField>;
})(() => ({
  margin: "10px 0",
}));

const DeletePallet = (props) => {
  const id_ObjectList = props.data;
  const palletList = useSelector((state) => state.pallet.palletList);

  const newPalletList = [];

  id_ObjectList.forEach((id) => {
    newPalletList.push(
      palletList.filter((pallet) => pallet.pallet_id === id)[0]
    );
  });

  const dispatch = useDispatch();

  return (
    <>
      {/* {console.log("pallet: ", newPalletList)} */}
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
            <Box key={index}>
              <Typography variant="h5">{pallet.pallet_id}</Typography>
              <TextFieldCustomized
                variant='standard' 
                label="Trang thai" 
                error={pallet.is_used?true:false}
                disabled
                value={pallet.is_used?'Dang dung':'Co san'}  
              />
            </Box>
          ))}

          {/* <Typography variant="h4">{pallet.pallet_id}</Typography>
          <TextFieldCustomized label="ID Kho" value={pallet.warehouse_id}/>
          <TextFieldCustomized label="Mo ta" value={pallet.description}/>
          <TextFieldCustomized label="Trang thai" value={pallet.is_used}/>
          <TextFieldCustomized label="Ngay nhap" value={pallet.import_date}/>
          <TextFieldCustomized label="Ngay SD" value={pallet.storage_start_data}/>
          <TextFieldCustomized label="Vi tri" value={pallet.position}/> */}
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

export default DeletePallet;
