import React, { useCallback, useEffect, useContext } from "react";
import Key from "./Key";
import { AppContext } from "../App";

function Keyboard() {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];
  const { onEnter, onDelete, onSelectLetter, disabledLetters, correctLetters } = useContext(AppContext);

  //KEY PRESS EVENT HANDLER
  const handleKeyboard = useCallback((e) => {
    if (e.key === "Enter") {
      onEnter();
    } else if (e.key === "Backspace") {
        onDelete();
    } else {
      keys1.forEach((key) => {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys2.forEach((key) => {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys3.forEach((key) => {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line">
        {keys1.map((key) => {
          return <Key keyVal={key} key={key} disabled={disabledLetters.includes(key)} correct={correctLetters.includes(key)}/>;
        })}
      </div>
      <div className="line">
        {keys2.map((key) => {
          return <Key keyVal={key} key={key} disabled={disabledLetters.includes(key)} correct={correctLetters.includes(key)}/>;
        })}
      </div>
      <div className="line">
        <Key keyVal={"ENTER"} bigKey />
        {keys3.map((key) => {
          return <Key keyVal={key} key={key} disabled={disabledLetters.includes(key)} correct={correctLetters.includes(key)}/>;
        })}
        <Key keyVal={"DELETE"} bigKey/>
      </div>
    </div>
  );
}

export default Keyboard;
