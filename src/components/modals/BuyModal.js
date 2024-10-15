import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { colorPalette } from "../../utils/misc";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  minHeight: 100,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BuyModal = ({ open, onClose, onConfirm }) => {
  const theme = createTheme(colorPalette);

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="flex flex-col gap-20" sx={style}>
        <Typography variant="h6" component="h2">
          Are you sure you want to buy this product?
        </Typography>

        <ThemeProvider theme={theme}>
          <Box className="flex gap-20 justify-end">
            <Button
              variant="contained"
              disableElevation
              onClick={onClose}
              color="secondary"
            >
              No
            </Button>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={onConfirm}
            >
              Yes
            </Button>
          </Box>
        </ThemeProvider>
      </Box>
    </Modal>
  );
};

export default BuyModal;
