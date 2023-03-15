import { useEffect, useState } from "react";
import Axios from 'axios';
import WorkoutDetails from "../components/WorkoutDetails";
import Form from "../components/Form";
import { Box, Typography } from '@mui/material';

const Home = () => {
    const [ workouts, setWorkouts ] = useState(null);

    useEffect(() => {
        Axios.get("http://localhost:4000/api/workouts")
            .then(response => setWorkouts(response.data))
            .catch(error => console.log(error))
      }, [workouts])

    return (
        <Box sx={{ display: {xxs: 'block', sm: 'flex'} }}>
            <Box sx={{ flexBasis: '35%', flexGrow: 1 }}>
                <Form />
            </Box>
            <Box sx={{ flexBasis: '65%', flexGrow: 1}}>
                {workouts &&
                    workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </Box>
        </Box>
    )
}

export default Home