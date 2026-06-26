import express from 'express';
import Leaderboard from '../models/leaderboard.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const leaderboard = await Leaderboard.find().populate('user team').sort({ rank: 1 }).lean();
  res.json({
    leaderboard,
    count: leaderboard.length,
  });
});

export default router;
