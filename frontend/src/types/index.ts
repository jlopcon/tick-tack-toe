export type Board = string[][];

export interface SquareProps {
  value: string;
  onClick: () => void;
}

export interface BoardProps {
  board: Board;
  onClick: (row: number, col: number) => void;
}

export interface RankingData {
  player: string;
  wins: number;
  losses: number;
  draws: number;
}