import React from 'react';

import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const DropDown = props => {
  const { label, labelId, name, value, options, onChange } = props;

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={name}
        name={name}
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map(item => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDown;
