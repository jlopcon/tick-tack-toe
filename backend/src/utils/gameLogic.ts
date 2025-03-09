export const checkWinner = (board: string[][]): string | null => {
    // Comprobar filas
    for (let row = 0; row < 3; row++) {
        if (board[row][0] && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
            return board[row][0];  
        }
    }

    // Comprobar columnas
    for (let col = 0; col < 3; col++) {
        if (board[0][col] && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            return board[0][col];  
        }
    }

    // Comprobar diagonales
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];  
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];  
    }

    // Comprobar si el tablero está lleno (empate)
    if (board.flat().every(cell => cell !== "")) {
        return "draw"; 
    }

    return null;  // No hay ganador ni empate
};

export const getAIMove = (board: string[][], aiPlayer: string): { row: number, col: number } | null => {
    const opponent = aiPlayer === "X" ? "O" : "X";

    const findWinningMove = (player: string) => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === "") {
                    board[row][col] = player;
                    if (checkWinner(board) === player) {
                        board[row][col] = ""; 
                        return { row, col };
                    }
                    board[row][col] = ""; 
                }
            }
        }
        return null;
    };

    
    let move = findWinningMove(aiPlayer);
    if (move) return move;

    move = findWinningMove(opponent);
    if (move) return move;

    //Jugar en el centro 
    if (board[1][1] === "") return { row: 1, col: 1 };

    //Cualquiera
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === "") {
                return { row, col };
            }
        }
    }

    return null; 
};