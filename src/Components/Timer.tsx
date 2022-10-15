import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { optimizedSelectAppState } from "../features/appSlice";
import {
  optimizedSelectWordsState,
  setIsOver,
  setWasDoneEarly,
} from "../features/wordsSlice";

let haveStarted = false;
// let timeClear: NodeJS.Timeout;
let timeClear = 0;

const Timer = ({
  finishedEarly,
  timeDelay,
}: {
  timeDelay: number;
  finishedEarly: (timeTake: number) => void;
}) => {
  // console.count("Timer component rendered");

  const dispatch = useAppDispatch();

  const { startTime } = useAppSelector(optimizedSelectAppState);
  const { wasDoneEarly, startAnimating, restart } = useAppSelector(
    optimizedSelectWordsState
  );

  const [time, setTime] = useState<number>(startTime);

  useEffect(() => {
    setTime(startTime);
  }, [startTime]);

  useEffect(() => {
    if (time === 0) {
      clearInterval(timeClear);
      dispatch(setIsOver(true)); // Game over
      dispatch(setWasDoneEarly(false));
    }
  }, [time]);

  useEffect(() => {
    if (wasDoneEarly) {
      // Stops the time and pauses the timeFlow animation
      clearInterval(timeClear);
      const timeTaken = startTime - time;
      setProperty("--timer-animation-play-state", "paused");
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
      // console.log("startAnimating", startAnimating);
      setProperty("--timer-animation-name", "timer-animation-decrement");
      setProperty("--timer-animation-duration", `${time}s`);
      setProperty("--timer-animation-play-state", "running");
    } else {
      // set the width css variable to the current width for the animation to work well
      if (restart) {
        const el = window.getComputedStyle(
          document.querySelector(".timer")!,
          "::after"
        );
        setProperty("--timer-current-width", `${el.width}`);
        setProperty("--timer-current-bg-color", `${el.backgroundColor}`);

        setProperty("--timer-animation-duration", `${timeDelay}ms`);
        setProperty("--timer-animation-name", "timer-animation-increment");
        setProperty("--timer-animation-play-state", "running");
      }
    }
  }, [startAnimating]);

  function setProperty(prop: string, value: string) {
    const root = document.documentElement;
    root.style.setProperty(prop, value);
  }

  function updateTime(): void {
    setTime((prev) => prev - 1);
  }

  return <div className="timer">time left: {time}s</div>;
};

export default React.memo(Timer);
