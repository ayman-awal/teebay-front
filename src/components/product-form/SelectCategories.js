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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  'Electronics',
  'Furniture',
  'Home Appliances',
  'Sporting Goods',
  'Outdoor'
];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const SelectCategories = ({ nextStep, prevStep, values, handleChange }) => {
  const [personName, setPersonName] = useState([]);
  const theme = useTheme();

  

  // const continueHandler = (e) => {
  //   e.preventDefault();
  //   nextStep();
  // };

  // const backHandler = (e) => {
  //   e.preventDefault();
  //   prevStep();
  // };

  useEffect(() => {
    console.log('Updated personName:', personName);
    handleChange('categories')({ target: { value: personName } }); 
  }, [personName]);

  const handleDropdown = (event) => {
    const {
      target: { value },
    } = event;

    const newValues = typeof value === 'string' ? value.split(',') : value;
    setPersonName(newValues);
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
                {categories.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
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
