# Part 2 - React Tic Tac Toe

This part uses React with Vite.

To run it:

```bash
npm install
npm run dev
```

Implementation notes:

- `Board.jsx` keeps track of the board, the current player's turn, and the score for X and O.
- X always starts a new game.
- `calculateWinner` checks all possible winning lines.
- The New Game button clears the board but keeps the score.
- Extra credit: React Router adds a second page at `/rules`.
- External library: `react-router-dom` is used for React Routing.
- `node_modules` and `dist` are generated folders and do not need to be submitted.
