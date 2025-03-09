import { API_ROUTES } from './config';

export const makeMove = async (gameId: string, player: string, row: number, col: number) => {
  const response = await fetch(API_ROUTES.MAKE_MOVE(gameId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ player, row, col }),
  });

  if (!response.ok) {
    throw new Error('Error al realizar el movimiento');
  }

  return response.json();
};