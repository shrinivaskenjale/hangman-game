import { useState } from "react";
import "./App.css";
import Game from "./components/Game";

export default function App() {
  const [gameId, setGameId] = useState(() => Date.now());

  function handleResetGame() {
    setGameId(Date.now());
  }

  return (
    <main>
      <div className="title">
        <h1>Hangman</h1>
        <p>Find the hidden word - Enter a letter</p>
      </div>

      <Game key={gameId} onResetGame={handleResetGame} />
    </main>
  );
}
