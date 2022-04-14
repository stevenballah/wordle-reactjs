import React, { useState, createContext, useEffect } from "react";
import api from "./api/axios";
import "./App.css";
import Board from "./components/Board.js";
import Keyboard from "./components/Keyboard";
import GameOver from "./GameOver";
import { boardDefault, generateWordSet } from "./Words";

export const AppContext = createContext();
function App() {
  const [colorScheme, setColorScheme] = useState("default");
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [defineWord, setDefineWord] = useState([]);
  
  async function fetchDefinition() {
    const result = await api.get(`${correctWord}`)
    //console.log(result.data[0].meanings[0]);
    if (result.data) {
      setDefineWord(result.data[0].meanings[0].definitions);
    }
  }

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  useEffect(() => {
    if (correctWord !== "") {
      const getDefinition = async () => {
        await fetchDefinition();
      }
      getDefinition();
    }
  }, [correctWord])
  

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currentWord = "";
    for (let i = 0; i < 5; i++) {
      currentWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currentWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });

      if (currAttempt.attempt === 5 && wordSet) {
        setGameOver({ gameOver: true, guessedWord: false });
        return;
      }
    } else {
      alert("Word not found!");
    }

    if (currentWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle Unlimited</h1>
        <p>Developed by Steven Ballah</p>
      </nav>

      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          correctLetters,
          setCorrectLetters,
          setGameOver,
          gameOver,
          defineWord
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
