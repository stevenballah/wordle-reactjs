import React, { useContext } from "react";
import { AppContext } from "./App";

function GameOver() {
  const { gameOver, currAttempt, correctWord, defineWord } =
    useContext(AppContext);

  const newGame = () => {
    //REFRESH THE PAGE
    window.location.reload();
  };
  return (
    <div className="gameOver">
      <h3>
        {gameOver.guessedWord
          ? "Congratulation you guessed the word!!"
          : "You failed!"}
      </h3>
      <h2>Word: {correctWord}</h2>
      {gameOver.guessedWord && (
        <h3>You guessed in {currAttempt.attempt - 1} attempts!</h3>
      )}
      <h3>Definition</h3>
      <div className="definitions">
        {defineWord.map((def, index) => (
          <p className="definition" key={index}>
            {index + 1}. {def.definition}
          </p>
        ))}
      </div>

      <button className="newGame" onClick={newGame}>
        New Game
      </button>
    </div>
  );
}

export default GameOver;
