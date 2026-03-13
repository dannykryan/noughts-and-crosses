import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

const gameboard = (() => {
  const gameboardArr = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getBoard = () => gameboardArr;

  const resetBoard = () => {
    for (let i = 0; i < gameboardArr.length; i++) {
      for (let j = 0; j < gameboardArr[i].length; j++) {
        gameboardArr[i][j] = "";
      }
    }
  };

  const setCell = (row, col, symbol) => {
    if (gameboardArr[row][col] === "") {
      gameboardArr[row][col] = symbol;
      return true;
    }
    return false;
  };

  return { getBoard, resetBoard, setCell };
})();

const players = ((playerOneName, playerTwoName) => {
  const playerOne = { name: playerOneName, symbol: "X" };
  const playerTwo = { name: playerTwoName, symbol: "O" };
  return { playerOne, playerTwo };
})("Danny", "CPU");

async function promptMove(playerSymbol) {
  while (true) {
    console.log("Current board:");
    const board = gameboard.getBoard();
    for (const row of board) {
      console.log(row.map((cell) => cell || "-").join(" "));
    }
    const answer = await rl.question(
      `Player ${playerSymbol}, enter row,col (0-2): `,
    );
    const [rowStr, colStr] = answer.split(",");
    const row = Number(rowStr);
    const col = Number(colStr);

    const isValid =
      Number.isInteger(row) &&
      Number.isInteger(col) &&
      row >= 0 &&
      row <= 2 &&
      col >= 0 &&
      col <= 2;

    if (isValid) return { row, col };

    console.log("Invalid input. Example: 1,2");
  }
}

async function gameLoop() {
  const board = gameboard.getBoard();
  const turnOrder = [players.playerOne, players.playerTwo];
  let turnIndex = 0;
  let moves = 0;

  const winningCombinations = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]],
  ];

  const checkWinner = () => {
    for (const [a, b, c] of winningCombinations) {
      const val = board[a[0]][a[1]];
      if (val && val === board[b[0]][b[1]] && val === board[c[0]][c[1]]) return val;
    }
    return null;
  };

  while (true) {
    const currentPlayer = turnOrder[turnIndex % 2];
    const { row, col } = await promptMove(currentPlayer.symbol);
    const placed = gameboard.setCell(row, col, currentPlayer.symbol);

    if (!placed) {
      console.log("That cell is already taken. Try again.");
      continue;
    }

    moves++;
    const winner = checkWinner();

    if (winner) {
      console.log("Current board:");
      for (const r of board) console.log(r.map((cell) => cell || "-").join(" "));
      console.log(`Player ${winner} wins!`);
      break;
    }

    if (moves === 9) {
      console.log("Current board:");
      for (const r of board) console.log(r.map((cell) => cell || "-").join(" "));
      console.log("It's a draw!");
      break;
    }

    turnIndex++;
  }

  rl.close();
}

gameLoop();
