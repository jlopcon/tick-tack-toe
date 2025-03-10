import mongoose from "mongoose";
import dotenv from "dotenv";
import Game from "./models/Game";
import Ranking from "./models/Ranking";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/tic-tac-toe";

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("🟢 Conectado a MongoDB");
    } catch (error) {
        console.error("🔴 Error al conectar a MongoDB:", error);
        process.exit(1); 
    }    
};

export { Game, Ranking };