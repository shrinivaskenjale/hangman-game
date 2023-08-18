import "./Game.css";
import Popup from "./Popup";
import Notification from "./Notification";
import { useEffect, useState } from "react";

export default function Game({ onResetGame }) {
  const [word] = useState(() => getRandomWord());
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [status, setStatus] = useState("playing");

  // Check if word is complete or not
  const won = word.split("").every((letter) => {
    return correctLetters.includes(letter);
  });
  if (status !== "won" && won) {
    setStatus("won");
  }
  // Check if chances are over
  const lost = wrongLetters.length === figureParts.length;
  if (status !== "lost" && lost) {
    setStatus("lost");
  }

  useEffect(() => {
    if (status !== "playing") {
      return;
    }

    function handleKeyDown(e) {
      const pressedKeyCode = e.keyCode;

      if (!(pressedKeyCode >= 65 && pressedKeyCode <= 90)) {
        return;
      }

      const pressedLetter = e.key.toLowerCase();
      if (
        correctLetters.includes(pressedLetter) ||
        wrongLetters.includes(pressedLetter)
      ) {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
        return;
      }

      if (word.includes(pressedLetter)) {
        setCorrectLetters((cl) => {
          return [...cl, pressedLetter];
        });
      } else {
        setWrongLetters((wl) => {
          return [...wl, pressedLetter];
        });
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [correctLetters, word, wrongLetters, status]);

  const renderedWord = word.split("").map((letter, index) => {
    return (
      <div className="letter" key={index}>
        {correctLetters.includes(letter) ? letter : ""}
      </div>
    );
  });

  const renderedFigure = figureParts.slice(0, wrongLetters.length);

  return (
    <div className="game">
      <div className="display">
        <svg height={250} width={200} className="figure-container">
          {/* Rod */}
          <line x1={60} y1={20} x2={140} y2={20} />
          <line x1={140} y1={20} x2={140} y2={50} />
          <line x1={60} y1={20} x2={60} y2={230} />
          <line x1={20} y1={230} x2={100} y2={230} />

          {renderedFigure}
        </svg>

        <div className="wrong-letters">
          <small>Wrong Letters</small>
          <span>{wrongLetters.join(" ")}</span>
        </div>
      </div>
      <div className="word">{renderedWord}</div>
      {status === "won" && (
        <Popup message="You have won 👍" onClick={onResetGame} />
      )}
      {status === "lost" && (
        <Popup message="You have lost 👎" onClick={onResetGame} />
      )}

      <Notification show={showNotification} />
    </div>
  );
}

function getRandomWord() {
  const words = ["application", "programming", "interface", "wizard"];
  const randomIndex = Math.floor(Math.random() * words.length);

  return words[randomIndex];
}

const figureParts = [
  // Head
  <circle cx={140} cy={70} r={20} className="figure-part" key={1} />,
  // Body
  <line x1={140} y1={90} x2={140} y2={150} className="figure-part" key={2} />,
  // Arms
  <line x1={140} y1={120} x2={120} y2={100} className="figure-part" key={3} />,
  <line x1={140} y1={120} x2={160} y2={100} className="figure-part" key={4} />,
  // Legs
  <line x1={140} y1={150} x2={120} y2={180} className="figure-part" key={5} />,
  <line x1={140} y1={150} x2={160} y2={180} className="figure-part" key={6} />,
];
