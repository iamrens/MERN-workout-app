import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        bgcolor: 'rgba(242, 242, 242, 0.8)',
        borderRadius: 5 
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem' }}
      >
        404
      </Typography>
      <Typography
        variant="h2"
        sx={{ fontSize: '1.5rem', marginBottom: '2rem' }}
      >
        The page you are looking for could not be found.
      </Typography>
      <Link to="/">
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#115293',
            },
          }}
        >
          Go to Home Page
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;
