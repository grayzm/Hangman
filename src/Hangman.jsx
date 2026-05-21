import React from "react";
import "./Hangman.css";
import { nanoid } from "nanoid";
import Letters from "./components/Letters";
import { words } from "./contents/words";
import Answer from "./components/Answer";

// create array of the alphabet
const alphabet = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];

// map alphabet array to generate a key for each letter
const generateKeys = alphabet.map((letter) => ({
  value: letter,
  id: nanoid(3),
  isGuessed: false,
  isCorrect: false,
}));

export default function Hangman() {
  // initialize the keys
  const [letters, setLetters] = React.useState(generateKeys);

  // render each letter in letters
  const letterEl = letters.map((item) => (
    <Letters
      key={item.id}
      value={item.value}
      isGuessed={item.isGuessed}
      isCorrect={item.isCorrect}
      guess={() => guess(item.id)}
    />
  ));

  // divide letters into rows
  const row1 = letterEl.slice(0, 10);
  const row2 = letterEl.slice(10, 19);
  const row3 = letterEl.slice(19, 26);

  function getAnswer() {
    return words[Math.floor(Math.random() * words.length)];
  }

  const [answer, setAnswer] = React.useState(() => getAnswer());

  console.log([...answer]);
  const answerObj = [...answer].map((letter) => ({
    key: nanoid(3),
    value: letter,
    isShown: false,
  }));

  const answerSlot = answerObj.map((answerLetter) => (
    <Answer
      key={answerLetter.key}
      value={answerLetter}
      isShown={answerLetter.isShown}
    />
  ));

  function guess(id) {
    const clickedLetter = letters.find((item) => item.id === id);

    // if it's guessed, stop the function (make it unclickable)
    if (clickedLetter.isGuessed) {
      return;
    }

    setLetters((prev) =>
      prev.map((letter) =>
        letter.id === id ? { ...letter, isGuessed: !letter.isGuessed } : letter,
      ),
    );

    console.log(clickedLetter);
  }

  return (
    <main>
      <h1>Game Title</h1>
      <p>Guess the word within 8 attempts blablabla</p>
      <div>Hostages here</div>
      <div className="answer-container">{answerSlot}</div>
      <div className="keyboard-container">
        <div className="keyboard-row">{row1}</div>
        <div className="keyboard-row">{row2}</div>
        <div className="keyboard-row">{row3}</div>
      </div>
    </main>
  );
}
