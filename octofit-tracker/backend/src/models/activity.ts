import { Schema, model, Document } from 'mongoose';

export interface IActivity extends Document {
  user: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  timestamp: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    timestamp: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export default model<IActivity>('Activity', activitySchema);
