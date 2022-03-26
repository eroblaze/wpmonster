import React, { useContext, useEffect, useRef } from "react";

import { TypeContext } from "../Type/Type";

const Timer = () => {
  let { time, startAnimating } = useContext(TypeContext);
  const timeFlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (startAnimating) {
      if (timeFlowRef.current) {
        const { current: el } = timeFlowRef;
        el.style.animationDuration = `${time}s`;
        el.style.animationPlayState = "running";
      }
    } else {
      if (timeFlowRef.current) {
        const { current: el } = timeFlowRef;
        el.style.width = "100%";
        el.style.animationPlayState = "paused";
      }
    }
  }, [startAnimating]);

  return (
    <div className="timer-container">
      <h3>Time Left : {time}s</h3>
      <div className="time-flow" ref={timeFlowRef}></div>
    </div>
  );
};

export default Timer;
