import express from 'express';
import { 
    createWorkout,
    getWorkout,
    getAllWorkout,
    deleteWorkout,
    updateWorkout
} from '../controllers/workout.controller.js';
import requireAuth from '../middleware/require.auth.js';

const router = express.Router();

// require auth for all workouts
router.use(requireAuth);

router.route('/').get(getAllWorkout);
router.route('/:id').get(getWorkout);
router.route('/').post(createWorkout);
router.route('/:id').delete(deleteWorkout);
router.route('/:id').patch(updateWorkout);


export default router;