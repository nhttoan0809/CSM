import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDrawerTab, setExpandDrawer } from "../../../redux/drawer";
import * as api from './../../../api';

const TextFieldCustomized = styled((props) => {
  return <TextField variant="outlined" {...props}></TextField>;
})(() => ({
  margin: "10px 0",
}));

const isDeletable = (newProductList) => {
  let deletable = true;
  newProductList.forEach((product) => {
    if (product.position) {
      deletable = false;
    }
  });
  return deletable;
};

const ExportGoods = (props) => {
  const agent_id = useSelector((state) => state.agent.currentAgent);
  const warehouse_id = useSelector((state) => state.warehouse.currentWarehouse);
  const productList = useSelector((state) => state.product.productList);

  const id_ObjectList = props.data;
  const newProductList = [];

  id_ObjectList.forEach((id) => {
    newProductList.push(productList.filter((product) => product._id === id)[0]);
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
          <Typography variant="h3" sx={{ marginBottom: "2rem" }}>
            Xuat hang
          </Typography>
          {newProductList.map((product, index) => (
            <Box key={index} sx={{ marginBottom: "1.5rem" }}>
              <Typography variant="h5">ID: {product._id}</Typography>
              <TextFieldCustomized
                variant="standard"
                label="Trang thai"
                color="warning"
                error={product.position ? true : false}
                disabled
                value={product.position ? "Dang bao quan" : "Khong bao quan"}
                helperText={
                  product.position
                    ? "Mon hang nay dang duoc bao quan"
                    : "Co the xoa"
                }
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ margin: "0rem", display: "flex", justifyContent: "flex-end" }}>
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
          disabled={!isDeletable(newProductList)}
          variant="outlined"
          onClick={() => {
            newProductList.forEach(async(product) => {

              let isError = false;

              await api.warehouseAPI
                .export(agent_id, warehouse_id, product._id)
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
            navigate("/goods");
          }}
        >
          Xuat kho
        </Button>
      </Box>
    </>
  );
};

export default ExportGoods;
