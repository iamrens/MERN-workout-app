import express from 'express';
import { 
    createWorkout,
    getWorkout,
    getAllWorkout,
    deleteWorkout,
    updateWorkout
} from '../controllers/workout.controller.js';

const router = express.Router();

router.route('/').get(getAllWorkout);
router.route('/:id').get(getWorkout);
router.route('/').post(createWorkout);
router.route('/:id').delete(deleteWorkout);
router.route('/:id').patch(updateWorkout);


export default router;