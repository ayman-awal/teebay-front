import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CustomAlert from "../CustomAlert";

const SelectTitle = ({ nextStep, values, handleChange }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("warning");

  const continueHandler = () => {
    if(!values.title || String(values.title).trim() === ""){
      setAlertMessage("Please enter title");
      setAlertSeverity("warning");
      setAlertOpen(true);
    }
    else{
      nextStep();
    }
  }

  return (
    <div
      className="container flex justify-center align-center center"
      style={{ minHeight: "100vh", width: "60%" }}
    >
      <div style={{ width: "80%" }}>
        <Box p={6}>
          <h2 style={{ textAlign: "center" }}>
            Select a title for your product
          </h2>
          <TextField
            onChange={handleChange("title")}
            defaultValue={values.title}
            margin="normal"
            fullWidth
          />
          <Box mt={3} textAlign="center">
            <Button color="primary" variant="contained" onClick={continueHandler}>
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

export default SelectTitle;
