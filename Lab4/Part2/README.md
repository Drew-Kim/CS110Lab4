# Part 2 - React Tic Tac Toe

This part uses React with Vite.

To run it:

```bash
npm install
npm run dev
```

Code structure:

- src/main.jsx starts the React app and connects it to the root div in index.html.
- src/App.jsx sets up the page routes and navigation links.
- src/Board.jsx contains the Tic Tac Toe game logic and board display.
- src/RulesPage.jsx contains the extra credit rules page.
- src/styles.css contains the styling for the game, navigation, and rules page.
- package.json lists the scripts and libraries used by the React app.

Implementation notes:

- Board.jsx keeps track of the board, the current player's turn, and the score for X and O.
- X always starts a new game.
- calculateWinner checks all possible winning lines.
- The New Game button clears the board but keeps the score.
- Extra credit: React Router adds a second page at /rules.
- The main game page is at /, and the rules page is at /rules.
- External library: react-router-dom is used for React Routing.
- node_modules and dist are generated folders and do not need to be submitted.
