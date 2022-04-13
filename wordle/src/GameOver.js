import React, { useContext } from 'react'
import { AppContext } from './App'

function GameOver() {
    const {gameOver, currAttempt, correctWord, setGameOver} = useContext(AppContext);

    const newGame = () => {
        //REFRESH THE PAGE
        window.location.reload();
    }
  return (
    <div className="gameOver">
        <h3>{gameOver.guessedWord ? "Congratulation you guessed the word!!" : "You failed!"}</h3>
        <h2>Word: {correctWord}</h2>
        {gameOver.guessedWord && <h3>You guessed in {currAttempt.attempts} attempts!</h3>}
        <button className="newGame" onClick={newGame}>New Game</button>
    </div>
  )
}

export default GameOver