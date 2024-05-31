'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html, body, #__next {
          height: 100%;
          margin: 0;
          padding: 0;
          background: #f0f2f5; // Light gray background
          color: #333; // Basic text color
        }
        a {
          color: inherit; // Makes all links use the inherited color by default
          text-decoration: none; // Removes underline from links
        }
        // Add more global styles as needed
      `,
    },
  },
  palette: {
    primary: {
      // A nice shade of blue
      main: '#0f7506',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      // A complementary shade of amber
      main: '#ffc107',
      light: '#ffca28',
      dark: '#ffb300',
      contrastText: '#000000',
    },
    error: {
      // Red for errors
      main: '#d32f2f',
    },
  },
});

export default theme;
