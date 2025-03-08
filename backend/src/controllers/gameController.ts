import { Request, Response } from "express";
import Game from "../models/Game";

export const createGame = async (req: Request, res: Response) => {
    try {
        const newGame = new Game({ board: [["", "", ""], ["", "", ""], ["", "", ""]], status: "in_progress", currentPlayer: "X" });
        await newGame.save();
        res.status(201).json(newGame);
    } catch (error) {
        res.status(500).json({ message: "Error creating game", error });
    }
};

export const getGames = async (req: Request, res: Response) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: "Error fetching games", error });
    }
};
