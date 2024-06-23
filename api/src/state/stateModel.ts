import mongoose, { Document, Schema } from 'mongoose';

export interface IState extends Document {
  currentGameId: string;
}

const stateSchema: Schema = new Schema({
  currentGameId: { type: String, required: true }
});

export default mongoose.model<IState>('State', stateSchema);
