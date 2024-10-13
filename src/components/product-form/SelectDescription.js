import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const SelectDescription = ({ nextStep, prevStep, values, handleChange }) => {
  // const theme = createTheme();

  const continueHandler = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className='container flex justify-center align-center center' style={{minHeight: '100vh', width: '60%'}}>
      <div style={{width: '80%'}}>
        <Box p={10} style={{textAlign: 'center'}}>
            <h2 style={{textAlign: 'center'}}>
              Select Description
            </h2>
          <TextField
            // placeholder="Enter Your First Name"
            // label="First Name"
            onChange={handleChange('description')}
            defaultValue={values.description}
            multiline
            rows={4}
            margin="normal"
            fullWidth
          />
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

export default SelectDescription;
