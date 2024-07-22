import React from 'react';
import { Box, Button } from '@mui/material';

export default function NextButton({onHandle}) {
  return(
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        variant="contained"
        onClick={onHandle} // Use the onClick prop here
        sx={{ mt: 3, ml: 1 }}
      >
        Next
      </Button>
    </Box>
  );
}
