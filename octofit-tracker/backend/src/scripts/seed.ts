import mongoose from 'mongoose';
import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import Workout from '../models/workout.js';
import Leaderboard from '../models/leaderboard.js';

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  const teams = await Team.create([
    {
      name: 'Deep Sea Runners',
      description: 'A team focused on endurance and ocean-inspired challenges.',
      members: [],
    },
    {
      name: 'Coral Crushers',
      description: 'High-intensity training and team competition.',
      members: [],
    },
  ]);

  const users = await User.create([
    {
      name: 'Ava Brooks',
      email: 'ava.brooks@example.com',
      role: 'coach',
      joinedAt: new Date('2026-05-12T09:00:00Z'),
      team: teams[0]._id,
    },
    {
      name: 'Mason Lee',
      email: 'mason.lee@example.com',
      role: 'member',
      joinedAt: new Date('2026-05-18T07:30:00Z'),
      team: teams[0]._id,
    },
    {
      name: 'Isla Patel',
      email: 'isla.patel@example.com',
      role: 'member',
      joinedAt: new Date('2026-06-01T12:45:00Z'),
      team: teams[1]._id,
    },
    {
      name: 'Leo Carter',
      email: 'leo.carter@example.com',
      role: 'member',
      joinedAt: new Date('2026-05-20T10:15:00Z'),
      team: teams[1]._id,
    },
  ]);

  await Team.updateOne({ _id: teams[0]._id }, { members: [users[0]._id, users[1]._id] });
  await Team.updateOne({ _id: teams[1]._id }, { members: [users[2]._id, users[3]._id] });

  const workouts = await Workout.create([
    {
      title: 'Morning Tide Run',
      description: 'A brisk coastal run to build stamina and wake up the body.',
      durationMinutes: 45,
      intensity: 'medium',
    },
    {
      title: 'Coral Circuit',
      description: 'Full-body circuit training with bodyweight and agility drills.',
      durationMinutes: 30,
      intensity: 'high',
    },
  ]);

  const activities = await Activity.create([
    {
      user: users[1]._id,
      type: 'running',
      durationMinutes: 50,
      caloriesBurned: 430,
      timestamp: new Date('2026-06-24T06:30:00Z'),
    },
    {
      user: users[2]._id,
      type: 'strength training',
      durationMinutes: 40,
      caloriesBurned: 380,
      timestamp: new Date('2026-06-24T09:00:00Z'),
    },
    {
      user: users[3]._id,
      type: 'yoga',
      durationMinutes: 35,
      caloriesBurned: 220,
      timestamp: new Date('2026-06-23T18:30:00Z'),
    },
  ]);

  const leaderboardEntries = await Leaderboard.create([
    {
      user: users[1]._id,
      team: teams[0]._id,
      score: 1820,
      rank: 1,
    },
    {
      user: users[2]._id,
      team: teams[1]._id,
      score: 1680,
      rank: 2,
    },
    {
      user: users[3]._id,
      team: teams[1]._id,
      score: 1525,
      rank: 3,
    },
  ]);

  console.log('Seeded users:', users.length);
  console.log('Seeded teams:', teams.length);
  console.log('Seeded workouts:', workouts.length);
  console.log('Seeded activities:', activities.length);
  console.log('Seeded leaderboard entries:', leaderboardEntries.length);

  await mongoose.disconnect();
  console.log('Seeding complete and MongoDB connection closed');
}

seedDatabase().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
