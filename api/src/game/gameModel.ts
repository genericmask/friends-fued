import mongoose, { Document, Schema } from 'mongoose';

export interface IGame extends Document {
  state: any;  // Use a flexible type to accommodate the entire game state
}

const gameSchema: Schema = new Schema({
  state: { type: Schema.Types.Mixed, required: true }  // Mixed type for flexibility
});

export default mongoose.model<IGame>('Game', gameSchema);
