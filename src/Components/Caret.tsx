import React, { forwardRef } from "react";
import { useAppSelector } from "../app/hooks";
import { optimizedSelectAppState } from "../features/appSlice";
import { optimizedSelectWordsState } from "../features/wordsSlice";

const Caret = forwardRef<HTMLSpanElement>((_, ref) => {
  const { userIn } = useAppSelector(optimizedSelectWordsState);
  const { isBlockCaret } = useAppSelector(optimizedSelectAppState);

  let caretLeft = 0;

  if (userIn) caretLeft = userIn.length * 13.5;

  return (
    <span
      id={isBlockCaret ? "blockCaret" : "thinCaret"}
      className="blink"
      ref={ref}
      style={{
        left: caretLeft,
      }}
    >
      {isBlockCaret && <span>m</span>}
    </span>
  );
});

export default React.memo(Caret);
