// Aim to have as little code as possible in the global scope, so we wrap everything in an IIFE
(() => {
  function Gameboard() {

    // gameboardArr is an array of thee arrays, each representing a row
    const gameboardArr = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];

    const getBoard = () => gameboardArr;

    const resetBoard = () => {
      for (let i = 0; i < gameboardArr.length; i++) {
        for (let j = 0; j < gameboardArr[i].length; j++) {
          gameboardArr[i][j] = '';
        }
      }
    };

    const setCell = (row, col, symbol) => {
      if (gameboardArr[row][col] === '') {
        gameboardArr[row][col] = symbol;
        return true;
      }
      return false;
    };

    return { getBoard, resetBoard, setCell };
  }
})();

function Player() {
  const playerOne = { name: playerOneName, symbol: 'X' };
  const playerTwo = { name: playerTwoName, symbol: 'O' };
  
}

function gameController() {
  const winningCombinations = [
    [[0, 0], [0, 1], [0, 2]], // Row 1
    [[1, 0], [1, 1], [1, 2]], // Row 2
    [[2, 0], [2, 1], [2, 2]], // Row 3
    [[0, 0], [1, 0], [2, 0]], // Column 1
    [[0, 1], [1, 1], [2, 1]], // Column 2
    [[0, 2], [1, 2], [2, 2]], // Column 3
    [[0, 0], [1, 1], [2, 2]], // Diagonal top-left to bottom-right
    [[0, 2], [1, 1], [2, 0]]  // Diagonal top-right to bottom
  ];

  checkScore = (board) => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
        return board[a[0]][a[1]]; // Return the symbol of the winner
      }
    }
    return null; // No winner
  }

}
