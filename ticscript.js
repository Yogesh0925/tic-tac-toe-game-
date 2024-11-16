let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let userSymbol = "X";
let aiSymbol = "O";
let gameMode = "friend";
let scoreX = 0, scoreO = 0, draws = 0;

const cells = document.querySelectorAll(".cell");
const messageDiv = document.getElementById("message");
const scoreXSpan = document.getElementById("scoreX");
const scoreOSpan = document.getElementById("scoreO");
const drawsSpan = document.getElementById("draws");
const modeSelectionDiv = document.getElementById("mode-selection");
const symbolSelectionDiv = document.getElementById("symbol-selection");
const gameContainerDiv = document.getElementById("game-container");

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleClick(index));
});

function chooseSymbol(mode) {
  gameMode = mode;
  modeSelectionDiv.classList.remove("active");
  symbolSelectionDiv.classList.add("active");
}

function startGame(symbol) {
  userSymbol = symbol;
  aiSymbol = userSymbol === "X" ? "O" : "X";
  currentPlayer = "X"; // X always starts the game
  symbolSelectionDiv.classList.remove("active");
  gameContainerDiv.classList.add("active");
  resetGame();
}

function handleClick(index) {
  if (board[index] === "" && currentPlayer === userSymbol) {
    makeMove(index);
    if (checkWin()) return;
    if (gameMode === "ai" && currentPlayer === aiSymbol) aiMove();
  } else if (board[index] === "" && gameMode === "friend") {
    makeMove(index);
    checkWin();
  }
}

function makeMove(index) {
  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].classList.add(currentPlayer);
  if (checkWin()) {
    messageDiv.textContent = `${currentPlayer} wins! 🎉`;
    updateScore(currentPlayer);
    disableBoard();
  } else if (board.every(cell => cell !== "")) {
    messageDiv.textContent = "It's a draw! 🤝";
    updateScore("draw");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    messageDiv.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function aiMove() {
  let availableCells = board.map((val, idx) => (val === "" ? idx : null)).filter(val => val !== null);
  let aiIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
  makeMove(aiIndex);
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === currentPlayer)
  );
}

function updateScore(winner) {
  if (winner === "X") {
    scoreX++;
    scoreXSpan.textContent = scoreX;
  } else if (winner === "O") {
    scoreO++;
    scoreOSpan.textContent = scoreO;
  } else {
    draws++;
    drawsSpan.textContent = draws;
  }
}

function disableBoard() {
  cells.forEach(cell => cell.removeEventListener("click", handleClick));
}

function resetGame() {
  board.fill("");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
  currentPlayer = "X";
  messageDiv.textContent = `Player ${currentPlayer}'s turn`;
}
