"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Board from '../components/Board';
import { Board as BoardType } from '../types';
import { makeMove } from '../utils/api';
import { API_ROUTES } from '../utils/config';

const initialBoard: BoardType = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const Home: React.FC = () => {
  const [board, setBoard] = useState<BoardType>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [status, setStatus] = useState('Juego en progreso');
  const [gameId, setGameId] = useState<string | null>(null);

  useEffect(() => {
    const createGame = async () => {
      const response = await fetch(API_ROUTES.CREATE_GAME, {
        method: 'POST',
      });
      const data = await response.json();
      setGameId(data._id);
    };

    createGame();
  }, []);

  const handleClick = async (row: number, col: number) => {
    if (board[row][col] !== '' || !gameId || status !== 'Juego en progreso') return;

    try {
      const updatedGame = await makeMove(gameId, currentPlayer, row, col);
      setBoard(updatedGame.board);
      setCurrentPlayer(updatedGame.currentPlayer);
      setStatus(updatedGame.status === 'finished' ? `Ganador: ${updatedGame.winner}` : 'Juego en progreso');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl mb-4">3 en Raya</h1>
      <Board board={board} onClick={handleClick} />
      <p className="mt-4">{status}</p>
      <Link href="/ranking" className="mt-4 text-blue-500">
        Ver Ranking
      </Link>
    </div>
  );
};

export default Home;