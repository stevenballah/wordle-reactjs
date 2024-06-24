import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPos, attemptVal }) {
  const { board, correctWord, currAttempt, setDisabledLetters, setCorrectLetters } = useContext(AppContext);

  const letter = board[attemptVal][letterPos];

  // Convert correctWord to uppercase for consistent comparison
  const correctWordArray = correctWord.toUpperCase().split('');
  const currentGuessArray = board[attemptVal];

  let letterState = '';

  if (currAttempt.attempt > attemptVal) {
    // Check for correct letters first
    if (correctWordArray[letterPos] === letter) {
      letterState = 'correct';
      correctWordArray[letterPos] = null; // Mark this letter as used
    } else {
      // If not correct, check for almost matches
      if (correctWordArray.includes(letter)) {
        // Ensure it's not used already in a correct match
        const index = correctWordArray.indexOf(letter);
        if (index !== -1 && currentGuessArray[index] !== correctWordArray[index]) {
          letterState = 'almost';
          correctWordArray[index] = null; // Mark this letter as used
        } else {
          letterState = 'error';
        }
      } else {
        letterState = 'error';
      }
    }
  }

  useEffect(() => {
    if (letter !== "" && letterState === 'error') {
      setDisabledLetters((prev) => [...prev, letter]);
    }
    if (letter !== "" && letterState === 'correct') {
      setCorrectLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
