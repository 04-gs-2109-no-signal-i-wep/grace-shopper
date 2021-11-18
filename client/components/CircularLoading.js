import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#5b7b7a",
    },
    secondary: {
      main: '#ceb5a7',
    }
  },
});

export default function CircularLoading() {
  return (
    <>
    {console.log('circular progress running')}
    <ThemeProvider theme={theme}>
      <Box className="circular-loading" sx={{ display: 'flex' }}>
        <CircularProgress color="primary"/>
      </Box>
    </ThemeProvider>
    </>
  );
}

