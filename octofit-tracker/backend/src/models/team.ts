import { Schema, model, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  createdAt: Date;
  members: string[];
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export default model<ITeam>('Team', teamSchema);
