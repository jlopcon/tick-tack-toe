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

    return null;  // No hay ganador
};