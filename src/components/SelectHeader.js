import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectHeader(props) {
  const label = props.label;
  const itemList = props.itemList
  //  || [{ title: '', value: '' }];

  // console.log(`title: ${label}, itemList: ${itemList}`)

  const [ value, setValue ] = React.useState(-1)
  const handleChangeSelect = props.handleChangeSelect

  const handleChange = (event) => {
    handleChangeSelect(event.target.value)
    setValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginRight: '10px' }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
        >
          {
            itemList.map((item, indx) => (
              <MenuItem key={indx} value={item.value}>{item.title}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
  );
}
