import { useForm } from "react-hook-form";
import Axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Button, Grid, CircularProgress, Alert } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Form = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [ error, setError ] = useState(null);
  const [ alertSuccess, setAlertSuccess ] = useState(false);
  const { user } = useAuthContext();

  const onSubmit = async (data) => {
    if (!user) {
      setError('You must logged in.')
      setTimeout(() => {
        setError(false);
      }, 3000);
      return
    }

    const workout = {
      title: data.title,
      load: data.load,
      reps: data.reps,
    };
    try {
      const response = await Axios.post('http://localhost:4000/api/workouts', workout, {
        headers: { "Authorization": `Bearer ${user.token}` }
      });
      console.log('new workout added:', response.data);
      reset();
      setAlertSuccess(true);
      setTimeout(() => {
        setAlertSuccess(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setError('Error adding workout.');
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }

  const isFormValid = Object.keys(errors).length === 0;

  return (
    <Box sx={{m: {xxs: 'auto auto 16px 0', sm: '0 16px 0 0'}}}>
       <Accordion sx={{background: 'rgba(120, 255, 214, 0.7)'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" sx={{fontWeight: 700, color: '#263238'}}>Add Workout</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container component="form" onSubmit={handleSubmit(onSubmit)} spacing={{xxs: 1, sm: 2}}>
            <Grid item xs={12}>
              <TextField label="Title" type="text" {...register("title", { required: true })} fullWidth error={!!errors.title}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Load (kg)" type="number" {...register("load", { required: true })} fullWidth error={!!errors.load}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Reps" type="number" {...register("reps", { required: true })} fullWidth error={!!errors.reps}/>
              {!isFormValid && <Typography sx={{mt: 1, color: '#d50000'}}>Please fill the blanks.</Typography>}
            </Grid>
            
            <Grid item xs={12}>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={24} /> : "Add Workout"}
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>

        {alertSuccess && 
          <Alert variant="filled" severity="success" sx={{ position: 'fixed', top: 0, right: 0, m: '16px', opacity: 0.8}} onClose={() => setAlertSuccess(false)} open={alertSuccess}>
            Added successfully!
          </Alert>
        }
        {error && 
          <Alert variant="filled" severity="error" sx={{ position: 'fixed', top: 0, right: 0, m: '16px', opacity: 0.8}} onClose={() => setError(false)} open={error}>
            {error}
          </Alert>
        }

      </Accordion>
      
    </Box>
    
  )
}

export default Form;
