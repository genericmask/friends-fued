import mongoose, { Document, Schema } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  score: number;
}

const teamSchema: Schema = new Schema({
  name: { type: String, required: true },
  score: { type: Number, default: 0 }
});

export default mongoose.model<ITeam>('Team', teamSchema);
