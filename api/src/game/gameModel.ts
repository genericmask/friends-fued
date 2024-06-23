import mongoose, { Document, Schema } from 'mongoose';

export interface IGame extends Document {
  name: string;
  currentRound: number;
  rounds: mongoose.Types.ObjectId[];
  teams: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const gameSchema: Schema = new Schema({
  name: { type: String, required: true },
  currentRound: { type: Number, default: 0 },
  rounds: [{ type: Schema.Types.ObjectId, ref: 'Round' }],
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IGame>('Game', gameSchema);
