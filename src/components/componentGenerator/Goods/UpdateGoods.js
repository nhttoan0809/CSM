import styled from "@emotion/styled";
import { Box, Button, Slider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDrawerTab, setExpandDrawer } from "../../../redux/drawer";
import * as api from "./../../../api";

const TextFieldCustomized = styled((props) => {
  return <TextField variant="outlined" {...props}></TextField>;
})(() => ({
  margin: "10px 0",
}));

const SliderCustomize = (props) => {
  return (
    <Slider
      sx={{ marginX: "2rem" }}
      aria-label="Temperature"
      valueLabelDisplay="auto"
      step={1}
      marks
      min={1}
      max={10}
      {...props}
    />
  );
};

const UpdateGoods = (props) => {
  const AgentList = useSelector((state) => state.agent.agentList);
  const warehouseList = useSelector((state) => state.warehouse.warehouseList);
  const id_Object = props.data[0];
  const productList = useSelector((state) => state.product.productList);
  const product = productList.filter((product) => product._id === id_Object)[0];
  const agent_id = useSelector((state) => state.agent.currentAgent);
  const warehouse_id = useSelector((state) => state.warehouse.currentWarehouse);

  const [submitProduct, setSubmitProduct] = useState(product);

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
          <Typography variant="h6">ID: {submitProduct._id}</Typography>
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
            label="Mo ta"
            value={submitProduct.description}
            onChange={(event) => {
              setSubmitProduct({
                ...submitProduct,
                description: event.target.value,
              });
            }}
          />
          {/* Chieu rong */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ minWidth: "6rem" }}>
              Rong: {submitProduct.width}
            </Typography>
            <SliderCustomize
              defaultValue={submitProduct.width}
              onChange={(event) => {
                setSubmitProduct({
                  ...submitProduct,
                  width: event.target.value,
                });
              }}
            />
          </Box>
          {/* Chieu dai */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ minWidth: "6rem" }}>
              Dai: {submitProduct.length}
            </Typography>
            <SliderCustomize
              defaultValue={submitProduct.length}
              onChange={(event) => {
                setSubmitProduct({
                  ...submitProduct,
                  length: event.target.value,
                });
              }}
            />
          </Box>
          {/* Chieu cao */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ minWidth: "6rem" }}>
              Cao: {submitProduct.height}
            </Typography>
            <SliderCustomize
              defaultValue={submitProduct.height}
              onChange={(event) => {
                setSubmitProduct({
                  ...submitProduct,
                  height: event.target.value,
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
            Huy
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              api.productAPI
                .update_information(
                  agent_id,
                  warehouse_id,
                  submitProduct._id,
                  submitProduct.description,
                  submitProduct.width,
                  submitProduct.length,
                  submitProduct.height
                )
                .then((data) => {
                  if (data.status === "Successfully") {
                    dispatch(setDrawerTab({ type: "", action: "", data: "" }));
                    dispatch(setExpandDrawer(false));
                    navigate("/goods");
                  } else {
                    // Handle update fail
                  }
                });
            }}
          >
            Cap Nhat
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UpdateGoods;
