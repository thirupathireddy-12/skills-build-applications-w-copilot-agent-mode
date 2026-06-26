import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const users = await User.find().populate('team').lean();
  res.json({
    users,
    count: users.length,
  });
});

router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({
    user,
    message: 'User created',
  });
});

export default router;
