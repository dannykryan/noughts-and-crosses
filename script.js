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

    const clearBoard = () => {
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

    return { getBoard, clearBoard, setCell };
  }
})();

