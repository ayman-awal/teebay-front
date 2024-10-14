import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CustomAlert from "../CustomAlert";

const SelectDescription = ({ nextStep, prevStep, values, handleChange }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("warning");

  const continueHandler = (e) => {
    e.preventDefault();
    if(!values.description || String(values.description).trim() === ""){
      setAlertMessage("Please enter description");
      setAlertSeverity("warning");
      setAlertOpen(true);
    }
    else{
      nextStep();
    }
  };

  return (
    <div className='container flex justify-center align-center center' style={{minHeight: '100vh', width: '60%'}}>
      <div style={{width: '80%'}}>
        <Box p={10} style={{textAlign: 'center'}}>
            <h2 style={{textAlign: 'center'}}>
              Select Description
            </h2>
          <TextField
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
              onClick={continueHandler}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </div>
      <CustomAlert
        message={alertMessage}
        open={alertOpen}
        severity={alertSeverity}
        onClose={() => setAlertOpen(false)}
      />
    </div>
  );
};

export default SelectDescription;
