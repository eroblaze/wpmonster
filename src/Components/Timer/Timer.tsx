import React, { useContext, useEffect, useRef } from "react";

import { TypeContext } from "../Type/Type";

const Timer = ({ loadTime }: { loadTime: number }) => {
  let { time, startAnimating } = useContext(TypeContext);
  const timeFlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (startAnimating) {
      if (timeFlowRef.current) {
        const { current: el } = timeFlowRef;
        el.style.animationName = "time-flow-animation-decrement";
        el.style.animationDuration = `${time}s`;
        el.style.animationPlayState = "running";
      }
    } else {
      if (timeFlowRef.current) {
        const { current: el } = timeFlowRef;
        const root = document.documentElement;
        // set the width css variable to the current width for the animation to work well
        root.style.setProperty(
          "--current-width-of-timeFlow",
          `${el.offsetWidth}px`
        );
        el.style.animationDuration = `${loadTime}ms`;
        el.style.animationName = "time-flow-animation-increment";
        el.style.animationPlayState = "running";
      }
    }
  }, [startAnimating]);

  return (
    <div className="timer-container">
      <h3>Time Left: {time}s</h3>
      <div className="time-flow" ref={timeFlowRef}></div>
    </div>
  );
};

export default Timer;
