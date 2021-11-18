import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularLoading() {
  return (
    <>
    {console.log('circular progress running')}
    <Box className="circular-loading" sx={{ display: 'flex' }}>
      
      <CircularProgress />
    </Box>
    </>
  );
}

