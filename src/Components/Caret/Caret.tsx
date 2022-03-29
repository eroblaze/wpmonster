import React, { forwardRef, useContext } from "react";
import { TypeContext } from "../Type/Type";

const Caret = forwardRef<HTMLSpanElement, { putBlockClass: boolean }>(
  ({ putBlockClass }, ref) => {
    const { userIn } = useContext(TypeContext);
    const caretLeft = userIn.length * 12.5789;

    return (
      <span
        id={putBlockClass ? "blockCaret" : "thinCaret"}
        className="blink"
        ref={ref}
        style={{
          left: caretLeft,
        }}
      >
        {putBlockClass && <span>m</span>}
      </span>
    );
  }
);

export default Caret;
