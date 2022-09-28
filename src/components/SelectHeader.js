import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectHeader(props) {
  const [agent, setAgent] = React.useState('');

  const label = props.label;
  const itemList = props.itemList || [{title:'', value: ''}];

  const handleChange = (event) => {
    setAgent(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginRight: '10px' }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={agent}
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
