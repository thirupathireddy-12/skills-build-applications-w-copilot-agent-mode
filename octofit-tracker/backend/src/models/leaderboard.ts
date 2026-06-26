import { Schema, model, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: string;
  team: string | null;
  score: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
