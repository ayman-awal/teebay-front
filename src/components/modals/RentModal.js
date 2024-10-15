import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Modal from "@mui/material/Modal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { colorPalette } from "../../utils/misc";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  minHeight: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RentModal = ({
  open,
  onClose,
  fromValue,
  toValue,
  setFromValue,
  setToValue,
  onConfirm,
}) => {

  const theme = createTheme(colorPalette);

  const [isToDateValid, setIsToDateValid] = useState(true);

  useEffect(() => {
    if (toValue && fromValue) {
      setIsToDateValid(toValue.isAfter(fromValue));
    }
  }, [toValue, fromValue]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Rental period
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DatePicker", "DatePicker"]}
            sx={{ mb: 6, mt: 6 }}
          >
            <DatePicker
              label="From"
              value={fromValue}
              disablePast
              onChange={(newValue) => {
                console.log("New From date:", newValue.format());
                setFromValue(newValue);
              }}
            />
            <DatePicker
              label="To"
              value={toValue}
              disablePast
              onChange={(newValue) => {
                console.log("New To date:", newValue.format());
                setToValue(newValue);
              }}
            />
          </DemoContainer>
          <ThemeProvider theme={theme}>
            <Box className="flex gap-20 justify-end">
              <Button
                variant="contained"
                disableElevation
                onClick={onClose}
                color="secondary"
              >
                Go Back
              </Button>
              <Button variant="contained" disableElevation onClick={onConfirm} disabled={!isToDateValid}>
                Confirm Rent
              </Button>
            </Box>
          </ThemeProvider>
        </LocalizationProvider>
      </Box>
    </Modal>
  );
};

export default RentModal;
