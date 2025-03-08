import express, { Request, Response } from "express";
import { createGame, getGames, makeMove } from "../controllers/gameController";

const router = express.Router();

router.post("/new", createGame);
router.post("/:id/move", makeMove);
router.get("/", getGames);

export default router;
