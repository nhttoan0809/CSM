import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWarehouse } from "../redux/warehouse";

export default function SelectHeaderWarehouse(props) {
  const label = props.label;
  const itemList = props.itemList;
  const handleChangeSelect = props.handleChangeSelect;

  const value = useSelector(state => state.warehouse.currentWarehouse);

  const handleChange = (event) => {
    const value = event.target.value;
    handleChangeSelect(value);
  };

  return (
    <Box sx={{ minWidth: 120, marginRight: "10px" }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
        >
          {itemList.map((item, indx) => (
            <MenuItem key={indx} value={item.value}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

