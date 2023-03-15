import { Outlet } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import Fitness from '../assets/Fitness.jpg';

const RootLayout = () => {
  return (
    <Box sx={{ 
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0)), url(${Fitness})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '700px'
        }}>
        <Box sx={{ background: 'linear-gradient(to right, rgba(49, 183, 194, 0.2), rgba(123, 195, 147, 0.5))' }}>
            <AppBar  
                position="static" 
                elevation={3} 
                sx={{
                    bgcolor: '#fefefe', 
                    height: {xxs: '80px', sm: '100px'}, 
                    mb: 3,
                    opacity: 0.5
                    }}>
                <Toolbar>
                    <Typography
                        variant="h2"
                        component="a"
                        href="/"
                        sx={{
                            textDecoration: 'none',
                            color: '#02055A',
                            mt: 2.5,
                            letterSpacing: {xxs: '0rem', xs: '0.1rem', sm: '0.3rem'},
                            fontSize: {xxs: '34px',xs: '40px', sm: '50px'},
                            fontWeight: {xxs: 700, sm: 800},
                        }}
                    >Fitness Club</Typography>
                </Toolbar>
            </AppBar>
        </Box>

        <Container>
            <Outlet />
        </Container>

    </Box>
  )
}

export default RootLayout