import express from "express";
import cors from "cors";
import { connectDB } from "./db";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("Servidor funcionando con TypeScript y MongoDB");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
