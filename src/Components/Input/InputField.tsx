import React, { useContext } from "react";
import { TypeContext } from "../Type/Type";
import { TInputEvent } from "../Type/TypeTypes";

const Input = (): JSX.Element => {
  const { userIn, onInput } = useContext(TypeContext);
  return (
    <div className="input">
      <input
        type="text"
        value={userIn}
        onKeyDown={(e) => onInput(e as TInputEvent)}
        onChange={(e) => onInput(e as TInputEvent)}
        onPaste={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        autoFocus
        autoComplete="off"
        data-testid="main-input"
      />
    </div>
  );
};
export default Input;
