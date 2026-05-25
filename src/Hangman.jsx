import React from "react";
import "./Hangman.css";
import { nanoid } from "nanoid";
import Letters from "./components/Letters";
import { words } from "./contents/words";
import Answer from "./components/Answer";
import Hostages from "./components/Hostages";
import Duck from "./components/Duck";

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

const hostageData = [
  "#ff9f43",
  "#ff9ff3",
  "#1dd1a1",
  "#5f27cd",
  "#54a0ff",
  "#ee5253",
  "#ff7f00",
  "#ffd700",
  "#000",
].map((color) => ({
  id: nanoid(3),
  color: color,
  isKilled: false,
}));

export default function Hangman() {
  // initialize the keys
  const [letters, setLetters] = React.useState(generateKeys);
  const [wrongGuess, setWrongGuess] = React.useState(0);
  const [hostages, setHostages] = React.useState(hostageData);

  const [visible, setVisible] = React.useState({
    black: true,
    orange: true,
    yellow: true,
    orange2: true,
    red: true,
    pink: true,
    purple: true,
    blue: true,
    green: true,
  });

  // render each letter in letters
  const letterEl = letters.map((item) => {
    // const letterColorIfGuessed = item.isCorrect ? "1dd1a1" : "ee5253";
    // const matchingHostage = hostages.find(
    //   (h) => h.color === letterColorIfGuessed,
    // );
    // const isMatchingHostageKilled = matchingHostage
    //   ? matchingHostage.isKilled
    //   : false;

    return (
      <Letters
        key={item.id}
        value={item.value}
        isGuessed={item.isGuessed}
        isCorrect={item.isCorrect}
        guess={() => guess(item.id, item.value)}
        // isHostageKilled={isMatchingHostageKilled}
      />
    );
  });

  // divide letters into rows
  const row1 = letterEl.slice(0, 10);
  const row2 = letterEl.slice(10, 19);
  const row3 = letterEl.slice(19, 26);

  function getAnswer() {
    const randomWord = words[Math.floor(Math.random() * words.length)];

    return [...randomWord].map((letter) => ({
      key: nanoid(3),
      value: letter.toUpperCase(),
      isShown: false,
    }));
  }

  const [answer, setAnswer] = React.useState(() => getAnswer());

  console.log(answer);

  const answerSlot = answer.map((answerLetter) => (
    <Answer
      key={answerLetter.key}
      value={answerLetter.value}
      isShown={answerLetter.isShown}
    />
  ));

  const hostageEl = hostages.map((hostage) => (
    <Hostages
      key={hostage.id}
      color={hostage.color}
      isKilled={hostage.isKilled}
    />
  ));

  const hostageRow1 = hostageEl.slice(0, 5);
  const hostageRow2 = hostageEl.slice(5, 9);

  function killHostage(count) {
    setHostages((prev) =>
      prev.map((hostage, index) =>
        index === count ? { ...hostage, isKilled: true } : hostage,
      ),
    );
  }

  function guess(id, value) {
    const clickedLetter = letters.find((item) => item.id === id);

    // if it's guessed, stop the function (make it unclickable)
    if (clickedLetter.isGuessed) {
      return;
    }

    // check if guess letter is in the answer
    const isCorrectGuess = answer.some((item) => item.value === value);

    // update keyboard UI
    setLetters((prev) =>
      prev.map((letter) =>
        letter.id === id
          ? { ...letter, isGuessed: true, isCorrect: isCorrectGuess }
          : letter,
      ),
    );

    if (isCorrectGuess) {
      setAnswer((prev) =>
        prev.map((item) =>
          item.value === value ? { ...item, isShown: true } : item,
        ),
      );
    } else {
      console.log("wrong guess!");

      killHostage(wrongGuess);

      const colorOrder = [
        "orange2",
        "pink",
        "green",
        "purple",
        "blue",
        "red",
        "orange",
        "yellow",
        "black",
      ];

      const colorToHide = colorOrder[wrongGuess];

      if (colorToHide) {
        setVisible((prev) => ({
          ...prev,
          [colorToHide]: false,
        }));
      }

      setWrongGuess((prevCount) => prevCount + 1);
    }
  }

  return (
    <main>
      <h1>Da Duck</h1>
      <p>Guess the word and save da duck<br></br>from getting grayscaled!! 🐥</p>
      <Duck visible={visible} />
      <div className="hostage-container">
        <div className="hostage-row">{hostageRow1}</div>
        <div className="hostage-row">{hostageRow2}</div>
      </div>
      <div className="answer-container">{answerSlot}</div>
      <div className="keyboard-container">
        <div className="keyboard-row">{row1}</div>
        <div className="keyboard-row">{row2}</div>
        <div className="keyboard-row">{row3}</div>
      </div>
      <button>New Game!</button>
    </main>
  );
}
