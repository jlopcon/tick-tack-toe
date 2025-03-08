import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import gameRoutes from "./routes/gameRoutes";
import rankingRoutes from "./routes/rankingRoutes";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Rutas
app.use("/games", gameRoutes);
app.use("/ranking", rankingRoutes);

app.get("/", (req, res) => {
    res.send("Servidor funcionando con TypeScript y MongoDB");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
