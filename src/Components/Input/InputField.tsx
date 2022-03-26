import React, { useContext, useEffect, useRef } from "react";
import { TypeContext } from "../Type/Type";
import { TInputEvent } from "../Type/TypeTypes";

const Input = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { userIn, onInput, modalIsOpen } = useContext(TypeContext);

  // A type Predicate ( just for fun )
  const isInputValid = (
    input: React.MutableRefObject<HTMLInputElement | null>
  ): input is React.MutableRefObject<HTMLInputElement> => {
    return !!input.current;
  };

  useEffect(() => {
    if (!modalIsOpen && isInputValid(inputRef)) inputRef.current.focus();
  }, [modalIsOpen]);

  return (
    <div className="input-restart">
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
        ref={inputRef}
      />
      <span className="restart-span">rest</span>
    </div>
  );
};
export default Input;
