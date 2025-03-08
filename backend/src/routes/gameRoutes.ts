import express from "express";
import { createGame, getGames } from "../controllers/gameController";

const router = express.Router();

router.post("/new", createGame);
router.get("/", getGames);

export default router;
