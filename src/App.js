import React, { useState, useEffect } from "react";
import "./App.css";
import Keyboard from "./components/Keyboard";
import Title from "./components/Title";
import InputTiles from "./components/InputTiles";
import Message from "./components/Message";
import { alphabetDict, initialGuessRows } from "./constants";
import axios from "axios";

function App() {
  const [alphabetClass, setAlphabetClass] = useState(alphabetDict);
  const [alphabetObj, setAlphabetObj] = useState({});
  const [wordle, setWordle] = useState("");
  const [location, setLocation] = useState({
    currentRow: 0,
    currentTile: 0,
  });
  const [guessRows, setGuessRows] = useState(initialGuessRows);
  const [flag, setFlag] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  useEffect(() => {
    setAlphabetClass((prev) => ({ ...prev, ...alphabetObj }));
  }, [guessRows]);

  // console.log(alphabetClass);

  const getRandomWord = () => {
    const options = {
      method: "GET",
      url: "http://localhost:8000/word",
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setWordle(response.data.toUpperCase());
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRandomWord();
  }, []);

  const handleClick = (key) => {
    if (!isGameOver) {
      if (key == "ENTER") {
        // console.log("Enter Clicked");
        checkRow();
        return;
      }
      if (key == "<<") {
        // console.log("Delete Clicked");
        deleteLetter();
        return;
      }
      addLetter(key);
    }
  };

  const addLetter = (key) => {
    // console.log("clicked", key);
    if (location.currentRow < 6 && location.currentTile < 5) {
      setGuessRows((prev) => {
        let newArray = [...prev];
        newArray[location.currentRow][location.currentTile].letter = key;
        return newArray;
      });
      setLocation((prev) => ({
        ...prev,
        currentTile: prev.currentTile + 1,
      }));
      // console.log("after update location");
    }
  };

  const deleteLetter = () => {
    if (location.currentTile > 0) {
      setGuessRows((prev) => {
        let newArray = prev;
        newArray[location.currentRow][location.currentTile - 1].letter = " ";
        return newArray;
      });
      setLocation((prev) => ({
        ...prev,
        currentTile: prev.currentTile - 1,
      }));
    }
  };

  const checkRow = () => {
    const letterArray = [];

    guessRows[location.currentRow].forEach((tile) => {
      letterArray.push(tile.letter);
    });
    const guess = letterArray.join("");
    if (location.currentTile == 5) {
      const options = {
        method: "GET",
        url: "http://localhost:8000/check",
        params: { word: guess },
      };
      axios
        .request(options)
        .then((response) => response.data)
        .then((response) => {
          if (response) {
            flipTile();
            if (guess == wordle) {
              showMessage("Magnificent");
              setIsGameOver(true);
              return;
            } else {
              if (location.currentRow >= 5) {
                setIsGameOver(true);
                showMessage("Game Over");
                return;
              } else {
                setLocation((prev) => ({
                  currentRow: prev.currentRow + 1,
                  currentTile: 0,
                }));
              }
            }
            console.log(guess);
          } else {
            showMessage("Word Doesn't Exist");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const showMessage = (messsage) => {
    setFlag(messsage);
    setTimeout(() => setFlag(""), 2000);
  };

  const flipTile = () => {
    const letterArray = [];
    let checkWordle = wordle;
    guessRows[location.currentRow].forEach((tile) => {
      letterArray.push(tile.letter);
    });

    let guessArray = [];
    let classTracker = {};

    letterArray.forEach((letter) => {
      guessArray.push({ letter: letter, colorClass: "grey-overlay" });
      classTracker[letter] = "grey-overlay";
    });

    guessArray.forEach((guess, index) => {
      if (guess.letter == wordle[index]) {
        guess.colorClass = "green-overlay";
        classTracker[guess.letter] = "green-overlay";
        checkWordle = checkWordle.replace(guess.letter, "");
      }
    });

    guessArray.forEach((guess, index) => {
      if (checkWordle.includes(guess.letter)) {
        guess.colorClass = "yellow-overlay";
        classTracker[guess.letter] = "yellow-overlay";
        checkWordle = checkWordle.replace(guess.letter, "");
      }
    });

    setAlphabetObj(classTracker);
    letterArray.forEach((letter, index) => {
      setTimeout(() => {
        setGuessRows((prev) => {
          let newArray = [...prev];
          newArray[location.currentRow][index].classList +=
            "flip " + guessArray[index].colorClass;
          return newArray;
        });
      }, 500 * index);
    });
  };
  return (
    <div className="App">
      <div className="game-container">
        <Title></Title>
        {flag && <Message text={flag}></Message>}
        <InputTiles data={guessRows}></InputTiles>
        <Keyboard
          onClick={handleClick}
          colorClassList={alphabetClass}
        ></Keyboard>
      </div>
    </div>
  );
}

export default App;
