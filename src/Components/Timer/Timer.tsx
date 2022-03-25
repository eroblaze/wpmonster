import React, { useContext } from "react";

import { TypeContext } from "../Type/Type";

const Timer = () => {
  let { time } = useContext(TypeContext);
  if (time === 60) {
    time = "1:00";
  } else if (time.toString().length === 2) {
    time = `0:${time}`;
  } else if (time === 0) time = "0:00";
  else {
    time = `0:0${time}`;
  }

  return (
    <span id="timer" style={{ color: "white" }}>
      {time}
    </span>
  );
};

export default Timer;
