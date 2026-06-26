import express from 'express';
import Activity from '../models/activity.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user').lean();
  res.json({
    activities,
    count: activities.length,
  });
});

router.post('/', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json({
    activity,
    message: 'Activity created',
  });
});

export default router;
