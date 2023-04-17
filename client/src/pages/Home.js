import { useEffect, useState } from "react";
import Axios from 'axios';
import WorkoutDetails from "../components/WorkoutDetails";
import Form from "../components/Form";
import { useAuthContext } from "../hooks/useAuthContext";
import { Box } from '@mui/material';

const dbApi = process.env.REACT_APP_DB_API;

const Home = () => {
    const [ workouts, setWorkouts ] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {

        const fetchWorkouts = async () => {
            Axios.get(`${dbApi}/api/workouts`, {
                headers: { "Authorization": `Bearer ${user.token}` }
            })
            .then(response => setWorkouts(response.data))
            .catch(error => console.log(error));
        }

        if (user) {
            fetchWorkouts()
        }

    }, [user, workouts]);

    

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