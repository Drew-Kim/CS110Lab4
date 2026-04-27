import React from "react";
import { Link } from "react-router-dom";

export default function RulesPage() {
  return (
    <section className="info-page">
      <h1>How to Play</h1>

      <p>
        X always goes first. Players take turns choosing an empty square until
        someone wins or the board is full.
      </p>

      <ul>
        <li>Get three marks in a row to win.</li>
        <li>Rows, columns, and diagonals all count.</li>
        <li>The New Game button clears the board but keeps the score.</li>
      </ul>

      <Link className="back-link" to="/">
        Back to Game
      </Link>
    </section>
  );
}
