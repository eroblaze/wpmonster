import React, { useContext } from "react";

import { TypeContext } from "../Type/Type";

const Timer = () => {
  let { time } = useContext(TypeContext);
  time = time === 60 ? "1:00" : time;

  return (
    <span id="timer" style={{ color: "white" }}>
      {time}
    </span>
  );
};

export default Timer;
