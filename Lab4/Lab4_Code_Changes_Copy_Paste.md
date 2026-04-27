# Lab 4 Code Changes and Requirement Checklist

## Part 1 - New York Times API

For Part 1, I created a separate `Part1` folder that contains the required files:

- `index.html`
- `style.css`
- `main.js`
- `README.md`

The HTML was placed in `index.html`, the CSS was placed in `style.css`, and the JavaScript was placed in `main.js`, following the lab directions.

### Main Features Implemented

I created a New York Times Popular Articles page that lets the user choose:

- Popularity criteria: Most Viewed, Most Shared, or Most Emailed
- Time frame: Day, Week, or Month

When the user changes one of the radio button options, the page calls the New York Times Popular Articles API again and updates the page without refreshing.

### Fetch API

The project uses the JavaScript Fetch API in `main.js` to make a GET request to the NYT Popular Articles API.

The request URL changes depending on the selected popularity criteria and time frame.

### Article Display

The page displays up to 5 popular articles. Each article item includes:

- An image
- A title
- An abstract/description
- A published date

Each article is shown inside its own separated card so the articles are easy to read.

### Error Handling

The code uses `try/catch` blocks when creating article cards.

If an article is missing required information, such as image data, the code skips that article and moves on to the next article from the API results. This follows the lab requirement to avoid breaking the page when an article has missing or unusable media.

### Responsive Design

The CSS uses media queries so the layout changes on smaller screens.

On wider screens, the filter box appears on the left and the article list appears on the right. On screens smaller than 900px, the page changes to a single-column layout with the filter box above the articles.

### Documentation

I added JSDoc-style function comments in `main.js` for the main JavaScript functions. I also added a `README.md` file explaining how the API key is used and noting that no external libraries were used for Part 1.

## Part 2 - React Tic Tac Toe

For Part 2, I created a separate `Part2` folder with a React project using Vite.

Important files include:

- `src/Board.jsx`
- `src/App.jsx`
- `src/RulesPage.jsx`
- `src/main.jsx`
- `src/styles.css`
- `package.json`
- `README.md`

### Main Game Features Implemented

The Tic Tac Toe game in `Board.jsx` includes the required features:

- X always starts the game.
- The app keeps track of whose turn it is.
- The app keeps score for X and O.
- The app calculates and displays the winner.
- The app includes a New Game button.

### Player Turn Tracking

The game uses React state to track whether X or O should play next.

When a player clicks an empty square, the board updates and the turn switches to the other player.

### Score Tracking

The game uses React state to store the scores for X and O.

When a player wins, that player's score increases by 1. The New Game button clears the board but keeps the current score.

### Winner Calculation

The `calculateWinner` function checks all possible winning combinations:

- Three rows
- Three columns
- Two diagonals

If one player has three matching marks in one of those lines, the game displays that player as the winner.

### New Game Button

The New Game button resets the board to an empty Tic Tac Toe board and makes X the first player again.

The score does not reset when starting a new game, so users can play multiple rounds.

## Extra Credit - React Routing

For the extra credit, I added React Routing to Part 2 using the `react-router-dom` library.

The app now has two pages:

- `/` - Tic Tac Toe game page
- `/rules` - Rules page

The new page is implemented in `src/RulesPage.jsx`.

I also added a navigation bar in `App.jsx` so the user can move between the Game page and the Rules page.

The `README.md` file for Part 2 was updated to mention that `react-router-dom` is used for routing.

## External Libraries Used

Part 1:

- No external libraries were used.

Part 2:

- React was used to build the Tic Tac Toe game.
- Vite was used to run and build the React project.
- `react-router-dom` was used for the extra credit React Routing requirement.

## Testing and Verification

Part 1:

- The JavaScript file was checked with `node --check`.
- The NYT API key was added to `main.js`.

Part 2:

- Dependencies were installed with `npm install`.
- The React app was built successfully with `npm run build`.
- The local development server was tested.
- The game route `/` and rules route `/rules` both loaded successfully.
