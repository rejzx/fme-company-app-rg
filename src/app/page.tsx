import * as React from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Box sx={{
        textAlign: 'center', padding: 4, backgroundColor: '#f7f7f7',
        borderRadius: '15px', boxShadow: '1px 1px 15px rgba(0,0,0,0.2)'
      }}>
        <Typography variant="h2" component="h1" gutterBottom>
          COMPANY
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Welcome to the Company Portal
        </Typography>
        <Typography variant="body1" paragraph>
          This is the main public page for our COMPANY portal ...
        </Typography>
        <Link href="/posts" passHref>
          <Button variant="contained" color="primary" size="large">
            Enter the Portal
          </Button>
        </Link>
      </Box>
      <Paper elevation={3} sx={{ mt: 4, p: 2, backgroundColor: '#fafafa' }}>
        <Typography variant="caption" display="block" gutterBottom>
          Disclaimer: This application is a student project created by Richard Gherer and is not intended for production use. It is designed as a prototype to demonstrate a concept and does not guarantee any functionalities as a final product.
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          Data Protection Notice: Please refrain from entering any sensitive personal data into this portal. The login process has been designed to allow for the use of dummy, non-existent email addresses to protect your privacy. No real email addresses are required to use this service, and all provided data should be considered for demonstration purposes only.
        </Typography>
      </Paper>
    </Container>
  );
}
