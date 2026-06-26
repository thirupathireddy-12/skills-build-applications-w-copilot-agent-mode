import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

mongoose.connect(mongoUri).catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log(`Connected to MongoDB database octofit_db at ${mongoUri}`);
});

export default db;
