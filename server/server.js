import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import workoutRouter from './routes/workout.routes.js';
import userRouter from './routes/user.routes.js'

dotenv.config();

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json({limit: '50mb'}))
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/', (req, res) => {
    res.send({ message: 'Hello World!' });
})

// routes
app.use('/api/workouts', workoutRouter)
app.use('/api/user', userRouter)

// Connect to db
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected')
        app.listen(process.env.PORT, () => console.log('listening on port http://localhost:4000'));
    })
    .catch(error => console.log(error))

