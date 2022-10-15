import React from "react";
import { TInputEvent } from "../types/wordsTypes";
import Input from "./Input";
import Words from "./Words";

const WordsDiv = ({
  spaceCount,
  handleRestart,
  onInput,
  caretRef,
}: {
  handleRestart: () => void;
  onInput: (e: TInputEvent) => void;
  spaceCount: number;
  caretRef: React.RefObject<HTMLSpanElement>;
}) => {
  return (
    <div className="wordsDiv">
      <Words spaceCount={spaceCount} caretRef={caretRef} />
      <Input onInput={onInput} handleRestart={handleRestart} />
    </div>
  );
};

export default React.memo(WordsDiv);
