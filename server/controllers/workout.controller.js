import mongoose from "mongoose";
import Workout from "../models/workout.js"

// GET all workouts
const getAllWorkout = async (req, res) => {
    try {
        const workouts = await Workout
            .find({})
            .sort({createdAt: -1})
        res.status(200).json(workouts)
    } catch (error) {
        res.status(500).json( {message: error.message })
    }
    
};

// GET a single workout
// const getWorkout = async (req, res) => {
//     const { id } = req.params;
//     const workout = await Workout.findById(id)

//     if (!workout) {
//         return res.status(404).json({error: 'No such workout'})
//     }

//     res.status(200).json(workout)
// };

const getWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Workout does not exist'})
    }

    const workout = await Workout.findById(id)

    if (workout) {
        res.status(200).json(workout)
    } else {
        res.status(404).json({error: "Workout does not exist"})
    }
};

// CREATE a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    // if (!title || !load || !reps) {
    //     return res.status(400).json({ error: 'Please provide the blanks' });
    // }
    
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: "There is a problem adding your workout"})
    }

};

// DELETE a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Workout does not exist'})
    }

    // const workout = await Workout.findOneAndDelete({_id: id})
    const workout = await Workout.findByIdAndDelete({_id: id})

    if (workout) {
        res.status(200).json({ message: 'Workout deleted successfully.' })
    } else {
        res.status(400).json({error: "Workout does not exist"})
    }
};

// UPDATE a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Workout does not exist'})
    }

    const workout = await Workout.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if (workout) {
        res.status(200).json(workout)
    } else {
        res.status(400).json({error: "Workout does not exist"})
    }

};

export {
    createWorkout,
    getWorkout,
    getAllWorkout,
    deleteWorkout,
    updateWorkout
}