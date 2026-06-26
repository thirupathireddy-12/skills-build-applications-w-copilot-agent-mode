import { Schema, model, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description: string;
  durationMinutes: number;
  intensity: 'low' | 'medium' | 'high';
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    intensity: { type: String, enum: ['low', 'medium', 'high'], required: true },
  },
  { timestamps: true }
);

export default model<IWorkout>('Workout', workoutSchema);
