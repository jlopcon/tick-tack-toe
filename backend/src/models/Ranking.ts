import mongoose, { Schema, Document } from "mongoose";

// Interfaz para TypeScript
export interface IRanking extends Document {
  player: string;
  wins: number;
  losses: number;
  draws: number;
}

const RankingSchema = new Schema<IRanking>(
  {
    player: { type: String, required: true, enum: ["human", "ai"] },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IRanking>("Ranking", RankingSchema);
