import { Request, Response } from "express";
import Ranking from "../models/Ranking";

export const getRanking = async (req: Request, res: Response) => {
    try {
        const ranking = await Ranking.find();
        res.json(ranking);
    } catch (error) {
        res.status(500).json({ message: "Error fetching ranking", error });
    }
};

export const updateRanking = async (player: string, result: "win" | "loss" | "draw") => {
    try {
        console.log(`Actualizando ranking para: ${player}, Resultado: ${result}`);

        const ranking = await Ranking.findOne({ player });

        if (!ranking) {
            await Ranking.create({
                player,
                wins: result === "win" ? 1 : 0,
                losses: result === "loss" ? 1 : 0,
                draws: result === "draw" ? 1 : 0,
            });
        } else {
            if (result === "win") ranking.wins += 1;
            if (result === "loss") ranking.losses += 1;
            if (result === "draw") ranking.draws += 1;
            await ranking.save();
        }
    } catch (error) {
        console.error("Error updating ranking:", error);
    }
};

