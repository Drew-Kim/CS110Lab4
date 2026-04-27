import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Board from "./Board.jsx";
import RulesPage from "./RulesPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="nav">
          <NavLink to="/">Game</NavLink>
          <NavLink to="/rules">Rules</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/rules" element={<RulesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
