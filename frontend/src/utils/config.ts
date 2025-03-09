const API_BASE_URL = 'http://localhost:5000';

export const API_ROUTES = {
  CREATE_GAME: `${API_BASE_URL}/games/new`,
  MAKE_MOVE: (gameId: string) => `${API_BASE_URL}/games/${gameId}/move`,
  GET_RANKING: `${API_BASE_URL}/ranking`,
};