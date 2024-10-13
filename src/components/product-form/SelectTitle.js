import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const SelectTitle = ({ nextStep, values, handleChange }) => {

  return (
    <div className='container flex justify-center align-center center' style={{minHeight: '100vh', width: '60%'}}>
      <div style={{width: '80%'}}>
        <Box p={6}>
            <h2 style={{textAlign: 'center'}}>
              Select a title for your product
            </h2>
          <TextField
            // placeholder="Enter Your First Name"
            // label="First Name"
            onChange={handleChange('title')}
            defaultValue={values.title}
            margin="normal"
            fullWidth
          />
          <Box mt={3} textAlign="center">
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

export default SelectTitle;
