import React, {useState, useEffect} from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuProps, getStyles } from "../../utils/SelectCompUtil";

const SelectCategories = ({ nextStep, prevStep, values, handleChange }) => {
  const [categories, setCategories] = useState([]);
  const theme = useTheme();

  const categoryOptions = [
    'Electronics',
    'Furniture',
    'Home Appliances',
    'Sporting Goods',
    'Outdoor'
  ];

  // const continueHandler = (e) => {
  //   e.preventDefault();
  //   nextStep();
  // };

  // const backHandler = (e) => {
  //   e.preventDefault();
  //   prevStep();
  // };

  useEffect(() => {
    console.log('Updated categories:', categories);
    handleChange('categories')({ target: { value: categories } }); 
  }, [categories]);

  const handleDropdown = (event) => {
    const {
      target: { value },
    } = event;

    const newValues = typeof value === 'string' ? value.split(',') : value;
    setCategories(newValues);
    console.log('New values selected:', newValues);
  };

  return (
    <div className='container flex justify-center align-center center' style={{minHeight: '100vh', width: '60%'}}>
      <div style={{width: '80%'}}>
        <Box p={6}>
            <h2 style={{textAlign: 'center'}}>
              Select categories
            </h2>
            <FormControl sx={{ m: 1, width: '100%' }}>
              <InputLabel id="demo-multiple-name-label">Categories</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={values.categories}
                onChange={handleDropdown}
                input={<OutlinedInput label="Name" />}
                // fullWidth
                MenuProps={MenuProps}
              >
                {categoryOptions.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, categories, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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

export default SelectCategories;
