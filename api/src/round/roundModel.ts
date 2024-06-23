import mongoose, { Document, Schema } from 'mongoose';

export interface IAnswer {
  text: string;
  points: number;
  revealed: boolean;
  index: number;
}

export interface IRound extends Document {
  question: string;
  answers: IAnswer[];
  scorePool: number;
  strikes: number;
  maxStrikes: number;
}

const answerSchema: Schema = new Schema({
  text: { type: String, required: true },
  points: { type: Number, required: true },
  revealed: { type: Boolean, default: false },
  index: { type: Number, required: true }
});

const roundSchema: Schema = new Schema({
  question: { type: String, required: true },
  answers: [answerSchema],
  scorePool: { type: Number, required: true },
  strikes: { type: Number, default: 0 },
  maxStrikes: { type: Number, required: true }
});

export default mongoose.model<IRound>('Round', roundSchema);
