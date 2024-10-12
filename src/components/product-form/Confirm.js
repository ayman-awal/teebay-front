import React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { List, ListItem, ListItemText, Button, Typography, Box } from '@mui/material';

const Confirm = ({ nextStep, prevStep, values }) => {
  const theme = createTheme();
  const { firstName, lastName, email, occupation, city, bio } = values;

  // Functions for continuing and going back
  const continueHandler = (e) => {
    e.preventDefault();
    // PROCESS FORM //
    nextStep();
  };

  const backHandler = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open fullWidth maxWidth='sm'>
        <AppBar position="static">
          <Box p={2}>
            <Typography variant="h6" align="center">
              Confirm User Data
            </Typography>
          </Box>
        </AppBar>
        <List>
          <ListItem>
            <ListItemText primary="First Name" secondary={firstName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Last Name" secondary={lastName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email" secondary={email} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Occupation" secondary={occupation} />
          </ListItem>
          <ListItem>
            <ListItemText primary="City" secondary={city} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Bio" secondary={bio} />
          </ListItem>
        </List>
        <Box p={3} textAlign="center">
          <Button
            color="secondary"
            variant="contained"
            onClick={backHandler}
            sx={{ marginRight: 2 }}
          >
            Back
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={continueHandler}
          >
            Confirm & Continue
          </Button>
        </Box>
      </Dialog>
    </ThemeProvider>
  );
};

export default Confirm;
