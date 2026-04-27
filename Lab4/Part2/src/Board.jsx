import React, { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
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

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function boardIsFull(squares) {
  return squares.every((square) => square !== null);
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const winner = calculateWinner(squares);
  const isDraw = !winner && boardIsFull(squares);
  const currentPlayer = xIsNext ? "X" : "O";

  let status = `Next player: ${currentPlayer}`;

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Draw game";
  }

  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = currentPlayer;

    const nextWinner = calculateWinner(nextSquares);

    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    if (nextWinner) {
      setScores((currentScores) => ({
        ...currentScores,
        [nextWinner]: currentScores[nextWinner] + 1
      }));
    }
  }

  function startNewGame() {
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
