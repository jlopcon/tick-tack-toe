import { Request, Response } from "express";
import Game from "../models/Game";
import { checkWinner, getAIMove, isBoardFull } from "../utils/gameLogic";
import { updateRanking } from "./rankingController";

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

export const makeMove = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { player, row, col } = req.body;

    try {
        const game = await Game.findById(id);

        if (!game) {
            res.status(404).json({ message: "Juego no encontrado" });
            return;
        }

        if (game.status === "finished") {
            res.status(400).json({ message: "El juego ha terminado" });
            return;
        }

        if (game.board[row][col] !== "") {
            res.status(400).json({ message: "La casilla ya está ocupada" });
            return;
        }

        game.board[row][col] = player;
        game.currentPlayer = player === "X" ? "O" : "X";

        let result = checkWinner(game.board);
        if (result) {
            game.status = "finished";
            game.winner = result === "draw" ? null : result;

            await updateRanking(result === "X" ? "human" : "ai", result === "draw" ? "draw" : "win");
            await updateRanking(player === "X" ? "ai" : "human", result === "draw" ? "draw" : "loss");
            await game.save();
            res.status(200).json(game);
            return;
        }

        if (isBoardFull(game.board)) {
            game.status = "finished";
            game.winner = null;
            await updateRanking("human", "draw");
            await updateRanking("ai", "draw");
            await game.save();
            res.status(200).json(game);
            return;
        }

        if (game.currentPlayer === "O") { // la IA es "O"
            const aiMove = getAIMove(game.board, "O");
            if (aiMove) {
                game.board[aiMove.row][aiMove.col] = "O";
                game.currentPlayer = "X";

                result = checkWinner(game.board);
                if (result) {
                    game.status = "finished";
                    game.winner = result === "draw" ? null : result;
                    await updateRanking("ai", result === "draw" ? "draw" : "win");
                    await updateRanking("human", result === "draw" ? "draw" : "loss");
                }
            }
        }

        await game.save();
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ message: "Error al realizar el movimiento", error });
    }
};
