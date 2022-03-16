import React, { useContext } from "react";
import { TypeContext } from "../Type/Type";
import { AppCont } from "../../App";

const Div = (): JSX.Element => {
  const { words, pastColor } = useContext(TypeContext);
  const { isOver } = useContext(AppCont);

  const wordsArr: string[] = words.split("");
  const output = wordsArr.map((letter, index) => {
    return (
      <span
        key={index}
        data-testid={`div${index}`}
        style={{
          color:
            pastColor[index] === "rgb(226, 5, 5)" ? "black" : pastColor[index],
          backgroundColor:
            pastColor[index] === "rgb(226, 5, 5)"
              ? pastColor[index]
              : undefined,
        }}
      >
        {letter}
      </span>
    );
  });

  return (
    <div data-testid="words-div" className="words">
      {output}
    </div>
  );
};

export default Div;
