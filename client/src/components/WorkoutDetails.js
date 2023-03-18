import { useState } from "react";
import Axios from 'axios';
import { useForm } from "react-hook-form";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from "../hooks/useAuthContext";

import { Box, Typography, Stack, IconButton, CircularProgress, TextField, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CancelIcon from '@mui/icons-material/Cancel';

const WorkoutDetails = ({ workout }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [ alertEdit, setAlertEdit ] = useState(false);
    const [ alertDelete, setAlertDelete ] = useState(false);
    const [ error, setError ] = useState(null);
    const { user } = useAuthContext();

    const handleDelete = async (id) => {
        if (!user) {
            return
        }

        try {
          const response = await Axios.delete(`http://localhost:4000/api/workouts/${id}`, {
            headers: { "Authorization": `Bearer ${user.token}` }
          });
          console.log(response.data);
          setAlertDelete(true);
          setTimeout(() => {
            setAlertDelete(false);
          }, 3000);
        } catch (error) {
          console.error(error);
          setError('Error deleting workout!');
          setTimeout(() => {
            setError(false);
          }, 3000);
        }
    };

    const onSubmit = async (data) => {
        if (!user) {
            return
        }

        try {
            const response = await Axios.patch(`http://localhost:4000/api/workouts/${workout._id}`, data, {
                headers: { "Authorization": `Bearer ${user.token}` }
            });
            console.log(response.data);
            setIsEditing(false);
            setAlertEdit(true);
            setTimeout(() => {
                setAlertEdit(false);
            }, 3000);
        } catch (error) {
            console.error(error);
            setError('Error editing task');
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const isFormValid = Object.keys(errors).length === 0;

    return (
        <Box>
            {isEditing ? (
                    <Box 
                        component="form" 
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{background: 'linear-gradient(to left, rgba(168, 255, 120, 0.7), rgba(120, 255, 214, 0.7))', display: 'flex', p: 2, borderRadius: 5, mb: 2}}
                        >
                        <Box sx={{flexBasis: '90%', flexGrow: 1, mr: 2}}>
                            <Stack spacing={1}>
                            <TextField
                                size="small" 
                                label="Title" 
                                type="text" 
                                {...register("title", { required: true })} 
                                defaultValue={workout.title} 
                                error={!!errors.title}
                            />
                            <TextField 
                                size="small"
                                label="Load (kg)" 
                                type="number" 
                                {...register("load", { required: true })}
                                defaultValue={workout.load}
                                error={!!errors.load}
                            />
                            <TextField
                                size="small"
                                label="Reps" 
                                type="number" 
                                {...register("reps", { required: true })} 
                                defaultValue={workout.reps}
                                error={!!errors.reps}
                            />
                            {!isFormValid && <Typography sx={{color: '#d50000'}}>Please fill the blanks.</Typography>}
                            </Stack>
                        </Box>
                        <Box sx={{flexBasis: '10%', flexGrow: 1}}>
                            <Stack direction="row" spacing={1}>
                            <IconButton type="submit" disabled={isSubmitting} sx={{'&:hover': {bgcolor: '#3949ab'}}}>
                                {isSubmitting ? <CircularProgress size={24} /> : <SaveAsIcon sx={{color: '#212121', '&:hover': {color: '#fefefe'}}}/>}
                            </IconButton>
                            <IconButton onClick={handleCancel} sx={{'&:hover': {bgcolor: '#3949ab'}}}>
                                <CancelIcon sx={{color: '#212121', '&:hover': {color: '#fefefe'}}}/>
                            </IconButton>
                            </Stack>
                        </Box>
                    </Box>
            ) : (
                <Box sx={{
                    position: 'relative',
                    // background: 'rgba(18, 216, 210, 0.7)', 
                    background: 'linear-gradient(to left, rgba(168, 255, 120, 0.7), rgba(120, 255, 214, 0.7))',
                    borderRadius: 5, 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    '&:hover': {bgcolor : 'rgba(227, 242, 253, 0.8)'},
                    }}>
                    <Box sx={{p: 2, flexBasis: '90%', flexGrow: 1}}>
                        <Typography variant="h5" sx={{fontWeight: 700}}>
                            {workout.title}
                        </Typography>
                        <Typography>
                            Load (kg):{' '}
                            <Typography component="span" sx={{ fontWeight: 800, display: 'inline' }}>
                                {workout.load}
                            </Typography>
                        </Typography>
                        <Typography>
                            Reps:{' '}
                            <Typography component="span" sx={{ fontWeight: 800, display: 'inline' }}>
                                {workout.reps}
                            </Typography>
                        </Typography>
                        <Typography sx={{opacity: 0.6, fontStyle: 'italic'}}>
                            {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
                        </Typography>
                    </Box>
                    <Box sx={{p: 2, flexBasis: '10%', flexGrow: 1, position: 'absolute', top: 0, right: 0}}>
                        <Stack direction="row" spacing={1}>
                            <IconButton onClick={handleEdit} aria-label="delete" sx={{'&:hover': {bgcolor: '#3949ab'}}}>
                                <EditIcon sx={{color: '#212121', '&:hover': {color: '#fefefe'}}}/>
                            </IconButton>
                            <IconButton onClick={() => handleDelete(workout._id)} aria-label="delete" sx={{'&:hover': {bgcolor: '#3949ab'}}}>
                                <DeleteIcon sx={{color: '#212121', '&:hover': {color: '#fefefe'}}}/>
                            </IconButton>
                        </Stack>
                    </Box>
                </Box>
            )}
            {alertEdit && 
                <Alert variant="filled" severity="success" sx={{ position: 'fixed', top: 0, right: 0, m: '16px', opacity: 0.8}} onClose={() => setAlertEdit(false)} open={alertEdit}>
                    Edited successfully.
                </Alert>
            }
            {alertDelete && 
                <Alert variant="filled" severity="success" sx={{ position: 'fixed', top: 0, right: 0, m: '16px', opacity: 0.8}} onClose={() => setAlertDelete(false)} open={alertDelete}>
                    Deleted successfully.
                </Alert>
            }
            {error && 
                <Alert variant="filled" severity="error" sx={{ position: 'fixed', top: 0, right: 0, m: '16px', opacity: 0.8}} onClose={() => setError(false)} open={error}>
                    ERROR doing task!
                </Alert>
            }

        </Box>
    );
};

export default WorkoutDetails;
