import mongoose, { Schema, Document } from "mongoose";

export interface IGame extends Document {
  board: string[][]; 
  currentPlayer: string; 
  winner: string | null; 
  status: "in_progress" | "finished"; 
  createdAt: Date;
}

const GameSchema = new Schema<IGame>(
  {
    board: { type: [[String]], required: true }, 
    currentPlayer: { type: String, required: true }, 
    winner: { type: String, default: null }, 
    status: { type: String, enum: ["in_progress", "finished"], required: true },
    createdAt: { type: Date, default: Date.now }, 
  },
  { timestamps: true }
);

export default mongoose.model<IGame>("Game", GameSchema);
