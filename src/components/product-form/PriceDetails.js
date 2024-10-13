import React, { useState } from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MenuProps, getStyles } from "../../utils/SelectCompUtil";


const RentDetails = ({ nextStep, prevStep, values, handleChange }) => {
  const [rentRate, setRentRate] = useState([]);
  const theme = useTheme();

  const rentFrequency = [
    'per hour',
    'per day'
  ]

  const handleDropdown = (event) => {
    const { value } = event.target;

    // const newValues = typeof value === 'string' ? value.split(',') : value;
    // setRentRate(newValues);
    handleChange('rentFrequency')({ target: { value } });
    console.log(value);
  };

  return (
    <div className='container flex justify-center align-center center' style={{minHeight: '100vh', width: '60%'}}>
      <div>
        <Box p={4}>
        <Box style={{textAlign: 'center'}}>
            <h2>
              Select Price
            </h2>
        </Box>
            
          <TextField
            onChange={handleChange('purchasePrice')}
            placeholder='$'
            defaultValue={values.purchasePrice}
            margin="normal"
            fullWidth
          />
        <h4>
            Rent Price
        </h4>
        <Box className='flex align-center justify-center'>
            <TextField
                placeholder='$'
                onChange={handleChange('rentPrice')}
                defaultValue={values.rentPrice}
                margin="normal"
                // fullWidth
            />

            <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Frequency</InputLabel>
              <Select
                labelId="rent-frequency-label"
                id="rent-frequency"
                value={values.rentFrequency}
                onChange={handleDropdown}
                // onChange={('rentFrequency')}
                input={<OutlinedInput label="Rent Frequency" />}
                MenuProps={MenuProps}
              >
                {rentFrequency.map((frequency) => (
                  <MenuItem key={frequency} value={frequency} style={getStyles(frequency, rentRate, theme)}>
                    {frequency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
        </Box>
        
        <Box mt={3} textAlign="center" className='flex justify-between'>
          <Button
            color="primary"
            variant="contained"
            onClick={prevStep}
          >
            Back
          </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={nextStep}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </div>
        
    </div>
  );
};

export default RentDetails;
