import React, { useContext } from "react";

import Spinner from "../Spinner/Spinner";

import { TypeContext } from "../Type/Type";
import { AppCont } from "../../App";

const Timer = () => {
  let { time } = useContext(TypeContext);
  const { isOver } = useContext(AppCont);

  time = time === 60 ? "1:00" : time;
  return (
    <span id="timer" style={{ color: "white" }}>
      {isOver ? <Spinner /> : time}
    </span>
  );
};

export default Timer;
