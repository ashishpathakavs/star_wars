import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Dropdown = ({ handleSelection, menuItems, label }) => {
  const [selected, setSelected] = React.useState('');

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  useEffect(() => {
    handleSelection(selected);
  }, [selected]);

  return (
    <div>
      <Box sx={{ maxWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selected}
            label={label}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {menuItems.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default Dropdown;
