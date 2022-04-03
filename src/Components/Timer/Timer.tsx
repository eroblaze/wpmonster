import React, { useContext, useEffect, useRef, useState } from "react";

import { AppCont } from "../../App";
import { TypeContext } from "../Type/Type";

let haveStarted = false;
let timeClear: NodeJS.Timeout;

interface TimerInterface {
  timeDelay: number;
  startAnimating: boolean;
  wasDoneEarly: boolean;
  setWasDoneEarly: React.Dispatch<React.SetStateAction<boolean>>;
  finishedEarly: (timeTake: number) => void;
}

const Timer = ({
  timeDelay,
  startAnimating,
  wasDoneEarly,
  setWasDoneEarly,
  finishedEarly,
}: TimerInterface) => {
  // console.count("Timer component rendered");
  const { startTime } = useContext(AppCont);
  const [time, setTime] = useState<number>(startTime);
  let { isOver, setIsOver } = useContext(TypeContext);
  const timeFlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTime(startTime);
  }, [startTime]);

  useEffect(() => {
    if (time === 0) {
      clearInterval(timeClear);
      setIsOver(true); // Game over
      setWasDoneEarly(false);
    }
  }, [time]);

  useEffect(() => {
    if (wasDoneEarly) {
      // Stops the time and pauses the timeFlow animation
      clearInterval(timeClear);
      const timeTaken = startTime - time;
      if (timeFlowRef.current) {
        const { current } = timeFlowRef;
        current.style.animationPlayState = "paused";
      }
      finishedEarly(timeTaken);
    }
  }, [wasDoneEarly]);

  useEffect(() => {
    // This is to reduce the state by a second
    if (startAnimating && !haveStarted) {
      timeClear = setInterval(updateTime, 1000);
      haveStarted = true;
    } else if (!startAnimating) {
      clearInterval(timeClear);
      haveStarted = false;
      setTime(startTime);
    }

    // timeFlow animation
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
        el.style.animationDuration = `${timeDelay}ms`;
        el.style.animationName = "time-flow-animation-increment";
        el.style.animationPlayState = "running";
      }
    }
  }, [startAnimating]);

  function updateTime(): void {
    setTime((prev) => prev - 1);
  }

  return (
    <div className="timer-container">
      <p>Time Left: {time}s</p>
      <div className="time-flow" ref={timeFlowRef}></div>
    </div>
  );
};

export default React.memo(Timer);
