import { useSignup } from "../hooks/useSignup";
import { useForm } from 'react-hook-form';
import { Box, Typography, TextField, Button, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from 'react';

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const { signup, isLoading, error } = useSignup();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    await signup(data.email, data.password);
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

        <Typography fontWeight="bold" sx={{fontSize: '30px'}}>Signup</Typography>

        <TextField label="Email Address" type="email" {...register("email", { required: true })} fullWidth />

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
            {isLoading ? <CircularProgress size={24} /> : "Signup"}
          </Button>

          <Typography 
            onClick={() => {
              navigate("/login")
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
            Already have an account? Login here.
          </Typography>


        </Box>
    </Box>
  )
}

export default Signup