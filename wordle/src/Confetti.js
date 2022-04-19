import React, { useCallback, useRef, useEffect } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

const canvasStyles = {
  position: "fixed",
  width: "100%",
  height: "100%",
  zIndex: -1,
};

function Confetti() {
    useEffect(() => {
        onClickCustom();
    }, [])
    
  const refAnimationInstance = useRef(null);

  const onClickCustom = () => {
    // starting the animation with custom settings
    refAnimationInstance.current({ particleCount: 100, spread: 100 });
  };

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  return (
    <>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </>
  );
}

export default Confetti;
