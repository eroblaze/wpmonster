import React, { useContext } from "react";
import { TypeContext } from "../Type/Type";

const Timer = () => {
  const { time } = useContext(TypeContext);
  return <div style={{ color: "white" }}>{time}</div>;
};

export default Timer;
