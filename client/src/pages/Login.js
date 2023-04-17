import { useForm } from 'react-hook-form';
import { useLogin } from '../hooks/useLogin';
import { Box, Typography, TextField, Button, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from 'react';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login, isLoading, error } = useLogin();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    await login(data.email, data.password);
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit(onSubmit)} 
      sx={{
        bgcolor: '#fefefe', 
        mx: 'auto', display: 'flex', 
        borderRadius: 2, 
        p: 3, 
        flexDirection: 'column', 
        gap: 3,
        minWidth: {xxs: '250px', xs: '300px'}, 
        maxWidth: '400px', 
      }}
      >

        <Typography fontWeight="bold" sx={{fontSize: '30px'}}>Login</Typography>

        <TextField label="Email Address" type="email" {...register("email", { required: true })} fullWidth/>

        <Box>
          <TextField 
            label="Password" 
            type={showPassword ? "text" : "password"} {...register("password", { required: true })} 
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography sx={{color: '#d50000', mt: 1}}>{error}</Typography>
        </Box>

        <Box>
          <Button variant="contained" type="submit" disabled={isLoading} sx={{'&:hover': {bgcolor: '#1aac83'}}}>
            {isLoading ? <CircularProgress size={24} /> : "Login"}
          </Button>

          <Typography 
            onClick={() => {
              navigate("/signup")
            }}
            sx={{
              textDecoration: "underline",
              color: 'blue',
              "&:hover": {
                cursor: "pointer",
                color: 'rgba(49, 183, 194, 1)',
              },
              mt: 2
            }}
          >
            Don't have an account? Sign Up here.
          </Typography>

        </Box>
    </Box>
  );
};

export default Login;
