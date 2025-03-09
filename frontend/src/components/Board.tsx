import React from 'react';
import { BoardProps } from '../types';
import Square from './Square';

const Board: React.FC<BoardProps> = ({ board, onClick }) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <Square
            key={`${rowIndex}-${colIndex}`}
            value={value}
            onClick={() => onClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Board;