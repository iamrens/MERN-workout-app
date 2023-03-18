import { useForm } from 'react-hook-form';
import { useLogin } from '../hooks/useLogin';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login, isLoading, error } = useLogin();

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

        <TextField label="Email Address" type="email" {...register("email", { required: true })} fullWidth />

        <Box>
          <TextField label="Password" type="password" {...register("password", { required: true })} fullWidth />
          <Typography sx={{color: '#d50000', mt: 1}}>{error}</Typography>
        </Box>

        <Box>
          
          <Button variant="contained" type="submit" disabled={isLoading} sx={{'&:hover': {bgcolor: '#1aac83'}}}>
            {isLoading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </Box>
    </Box>
  );
};

export default Login;
