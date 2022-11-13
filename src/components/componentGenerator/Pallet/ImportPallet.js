import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as api from "../../../api";
import { setDrawerTab, setExpandDrawer } from "../../../redux/drawer";
import {
  setCurrentPalletTemplate,
  setPalletTemplateList,
} from "../../../redux/pallet_template";

const TextFieldCustomized = styled((props) => {
  return <TextField variant="outlined" {...props}></TextField>;
})(() => ({
  margin: "10px 0",
}));

const ImportPallet = () => {
  const AgentList = useSelector((state) => state.agent.agentList);
  const warehouseList = useSelector((state) => state.warehouse.warehouseList);
  const agent_id = useSelector((state) => state.agent.currentAgent);
  const warehouse_id = useSelector((state) => state.warehouse.currentWarehouse);
  const palletTemplateList = useSelector(
    (state) => state.pallet_template.palletTemplateList
  );
  const currentPalletTemplate = useSelector(
    (state) => state.pallet_template.currentPalletTemplate
  );
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  const [submitPalletTemplate, setSubmitPalletTemplate] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    api.pallet_template.get_all().then((data) => {
      if (data.status === "Successfully") {
        dispatch(setPalletTemplateList(data.data));
      } else {
        dispatch(setPalletTemplateList([]));
      }
    });
  }, []);

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
          <Typography variant="h4">Nhap Pallet</Typography>
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
            variant="standard"
            label="Mo ta"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />

          <FormControl
            fullWidth
            sx={{ marginTop: "2rem", marginBottom: "1rem" }}
          >
            <InputLabel id="select-label">ID pallet mau</InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              value={currentPalletTemplate}
              label="ID pallet mau"
              onChange={(event) => {
                dispatch(setCurrentPalletTemplate(event.target.value));
                if (event.target.value === -1) {
                  setSubmitPalletTemplate({});
                } else {
                  setSubmitPalletTemplate(
                    palletTemplateList.filter(
                      (palletTemplate) =>
                        palletTemplate._id === event.target.value
                    )[0]
                  );
                }
              }}
            >
              {palletTemplateList.map((pallet_template, ind) => {
                return (
                  <MenuItem key={ind} value={pallet_template._id}>
                    {pallet_template._id}
                  </MenuItem>
                );
              })}
              <MenuItem key={-1} value={-1}>
                None
              </MenuItem>
            </Select>
          </FormControl>

          {currentPalletTemplate !== -1 && (
            <>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ minWidth: "6rem" }}>
                  So luong: {quantity}
                </Typography>
                <Slider
                  sx={{ marginX: "2rem" }}
                  aria-label="Temperature"
                  defaultValue={1}
                  // getAriaValueText={quantity}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={1}
                  max={10}
                  onChange={(event) => {
                    setQuantity(event.target.value);
                  }}
                />
              </Box>
              <TextFieldCustomized
                variant="standard"
                disabled
                label="Loai"
                value={submitPalletTemplate.type}
              />
              <TextFieldCustomized
                variant="standard"
                disabled
                label="Chieu dai"
                value={submitPalletTemplate.length}
              />
              <TextFieldCustomized
                variant="standard"
                disabled
                label="Chieu rong"
                value={submitPalletTemplate.width}
              />
              <TextFieldCustomized
                variant="standard"
                disabled
                label="Chieu cao"
                value={submitPalletTemplate.height}
              />
              <TextFieldCustomized
                variant="standard"
                disabled
                label="Phan cach ngang"
                value={submitPalletTemplate.horizontal_separator}
              />
              <TextFieldCustomized
                variant="standard"
                disabled
                label="Phan cach ngang-giua"
                value={submitPalletTemplate.middle_horizontal_separator}
              />
              <TextFieldCustomized
                variant="standard"
                disabled
                label="Phan cach thang"
                value={submitPalletTemplate.vertical_separator}
              />
            </>
          )}
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
            disabled={currentPalletTemplate === -1}
            variant="outlined"
            onClick={async() => {
              for (let i = 0; i < quantity; i++) {
                await api.palletAPI
                  .import(
                    agent_id,
                    warehouse_id,
                    submitPalletTemplate._id,
                    description
                  )
                  .then((data) => {
                    if (data.status === "Successfully") {
                    }
                  });
              }
              dispatch(setDrawerTab({ type: "", action: "", data: "" }));
              dispatch(setExpandDrawer(false));
              dispatch(setCurrentPalletTemplate(-1));
              dispatch(setPalletTemplateList([]));
              navigate("/pallet");
            }}
          >
            Nhap
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ImportPallet;
