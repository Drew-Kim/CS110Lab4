import React, { useState } from "react";

// A Square is one button on the Tic Tac Toe board.
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// This function checks the board to see if X or O has won.
function calculateWinner(squares) {
  // Each array contains three square positions that make a winning line.
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const line of winningLines) {
    const [a, b, c] = line;

    // If all three positions have the same player mark, that player wins.
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

// The board is full when every square has either X or O in it.
function boardIsFull(squares) {
  return squares.every((square) => square !== null);
}

export default function Board() {
  // xIsNext keeps track of whose turn it is. X starts first.
  const [xIsNext, setXIsNext] = useState(true);

  // squares stores the current value of all 9 board squares.
  const [squares, setSquares] = useState(Array(9).fill(null));

  // scores keeps track of how many games X and O have won.
  const [scores, setScores] = useState({ X: 0, O: 0 });

  // These values are recalculated every time the board changes.
  const winner = calculateWinner(squares);
  const isDraw = !winner && boardIsFull(squares);
  const currentPlayer = xIsNext ? "X" : "O";

  // The status message changes depending on the game state.
  let status = `Next player: ${currentPlayer}`;

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Draw game";
  }

  function handleClick(i) {
    // Do nothing if the square is already filled or the game is over.
    if (squares[i] || winner) {
      return;
    }

    // Make a copy of the board before changing it.
    const nextSquares = squares.slice();
    nextSquares[i] = currentPlayer;

    // Check if this move created a winner.
    const nextWinner = calculateWinner(nextSquares);

    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    // If someone won, add 1 point to that player's score.
    if (nextWinner) {
      setScores((currentScores) => ({
        ...currentScores,
        [nextWinner]: currentScores[nextWinner] + 1
      }));
    }
  }

  function startNewGame() {
    // Clear the board and let X start again. The scores stay the same.
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <section className="game">
      <h1>Tic Tac Toe</h1>

      <div className="scoreboard">
        <p>X Score: {scores.X}</p>
        <p>O Score: {scores.O}</p>
      </div>

      <div className="status">{status}</div>

      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>

      <button className="new-game-button" onClick={startNewGame}>
        New Game
      </button>
    </section>
  );
}
