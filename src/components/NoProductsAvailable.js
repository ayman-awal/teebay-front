import React from 'react';
import { Box, Typography } from '@mui/material';

const NoProductsAvailable = ({ message = "No products available", height = "90vh" }) => {
  return (
    <Box
      className = "flex justify-center align-center text-align"
      minHeight={height}
    >
      <Typography variant="h6" component="h1" gutterBottom>
        {message}
      </Typography>
    </Box>
  );
};

export default NoProductsAvailable;