import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  setDrawerTab, setExpandDrawer } from "../../../redux/drawer";

const TextFieldCustomized = styled((props) => {
  return <TextField variant="outlined" {...props}></TextField>;
})(() => ({
  margin: "10px 0",
}));

const UpdateGoods = (props) => {
  const id_Object = props.data[0];
  const productList = useSelector((state) => state.product.productList);
  const product = productList.filter(
    (product) => product.product_id === id_Object
  )[0];

  // console.log(product);

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
          <Typography variant="h4">{product.product_id}</Typography>
          <TextFieldCustomized label="ID Kho" value={product.warehouse_id} />
          <TextFieldCustomized label="Mo ta" value={product.description} />
          <TextFieldCustomized label="ID Pallet" value={product.position} />
          <TextFieldCustomized label="Vi tri" value={product.position} />
          <TextFieldCustomized label="TG Luu Tru" value={product.is_used} />
          <TextFieldCustomized label="Rong" value={product.width} />
          <TextFieldCustomized label="Dai" value={product.length} />
          <TextFieldCustomized label="Cao" value={product.height} />
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

export default UpdateGoods;
