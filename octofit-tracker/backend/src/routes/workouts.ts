import express from 'express';
import Workout from '../models/workout.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json({
    workouts,
    count: workouts.length,
  });
});

router.post('/', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json({
    workout,
    message: 'Workout created',
  });
});

export default router;
