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
