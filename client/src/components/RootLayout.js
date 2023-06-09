import { Outlet } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Container, Menu, MenuItem, Button } from '@mui/material';
import Fitness from '../assets/Fitness.jpg';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const RootLayout = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = () => {
        logout()
        setAnchorEl(null);
    }

    const handleMenu = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ 
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0)), url(${Fitness})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh'
            }}>

                <AppBar  
                    position="static" 
                    elevation={3}
                    sx={{
                        background: 'linear-gradient(to right, rgba(49, 183, 194, 0.7), rgba(120, 255, 214, 0.7))',
                        height: {xxs: '80px', sm: '100px'}, 
                        mb: 4,
                        }}>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Typography
                            variant="h2"
                            component="a"
                            href="/"
                            sx={{
                                textDecoration: 'none',
                                color: '#212121',
                                mt: {xxs: 3, xs: 2.5},
                                letterSpacing: {xxs: '0rem', xs: '0.1rem'},
                                fontSize: {xxs: '30px',xs: '40px', sm: '50px'},
                                fontWeight: {xxs: 700, sm: 800},
                            }}
                        >Fitness Club</Typography>
                        <Box sx={{ mt: 2.5}}>
                            {user &&
                                <Box>
                                    <Button aria-label="open menu" onClick={handleMenu} sx={{color: '#fefefe',bgcolor: '#212121', px: 1.5, py: {xxs: 0.3, xs: 0.5}, borderRadius: 5, '&:hover': {bgcolor: '#1aac83'}, fontSize: {xxs: '16px',xs: '18px'}}}>
                                        Profile
                                    </Button>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        >
                                        <MenuItem onClick={handleClose}>{user.email}</MenuItem>
                                        <MenuItem onClick={handleClick}>Logout</MenuItem>
                                    </Menu>
                                </Box>   
                            }
                        </Box>
                    </Toolbar>
                </AppBar>


            <Container>
                <Outlet />
            </Container>

        </Box>
    )
}

export default RootLayout