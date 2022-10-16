import React, { useEffect, useRef } from "react";
import { TInputEvent } from "../types/wordsTypes";

import { useAppSelector } from "../app/hooks";
import { optimizedSelectWordsState } from "../features/wordsSlice";

const Input = ({
  handleRestart,
  onInput,
}: {
  handleRestart: () => void;
  onInput: (e: TInputEvent) => void;
}) => {
  const { resultIsOpen, userIn, restart } = useAppSelector(
    optimizedSelectWordsState
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  // A type Predicate ( just for fun )
  const isInputValid = (
    input: React.MutableRefObject<HTMLInputElement | null>
  ): input is React.MutableRefObject<HTMLInputElement> => {
    return !!input.current;
  };

  useEffect(() => {
    if (!resultIsOpen && isInputValid(inputRef)) inputRef.current.focus();
  }, [resultIsOpen]);

  return (
    <div className="input-div">
      <input
        type="text"
        value={userIn}
        onKeyDown={(e) => onInput(e as TInputEvent)}
        onInput={(e) => onInput(e as TInputEvent)}
        onPaste={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        autoFocus
        autoComplete="off"
        autoCapitalize="none"
        data-testid="main-input"
        ref={inputRef}
      />
      <button
        className="icon__hover"
        onClick={() => {
          if (!restart) {
            inputRef.current?.focus();
            handleRestart();
          }
        }}
      >
        {/* <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.5 0.269897V11.1543H14.7857V7.52613H20.0871C19.25 6.39235 18.2083 5.50421 16.9621 4.86173C15.7158 4.21926 14.3951 3.89802 13 3.89802C11.9025 3.89802 10.8655 4.08698 9.88895 4.46491C8.91239 4.84284 8.03348 5.36721 7.25223 6.03804C6.47098 6.70886 5.81994 7.50724 5.29911 8.43316C4.77827 9.35909 4.42485 10.37 4.23884 11.466L0.695312 10.8425C0.955729 9.31185 1.45796 7.90406 2.20201 6.6191C2.94606 5.33415 3.86217 4.21926 4.95033 3.27443C6.0385 2.32961 7.27083 1.59265 8.64732 1.06355C10.0238 0.534448 11.4747 0.269897 13 0.269897C14.6927 0.269897 16.311 0.605309 17.8549 1.27613C19.3988 1.94696 20.7567 2.90595 21.9286 4.15312V0.269897H25.5ZM13 22.0386C14.0789 22.0386 15.1112 21.8496 16.0971 21.4717C17.083 21.0938 17.9665 20.5694 18.7478 19.8986C19.529 19.2278 20.1801 18.4294 20.7009 17.5035C21.2217 16.5775 21.5751 15.5666 21.7612 14.4706L25.3047 15.0942C25.0443 16.6248 24.542 18.0326 23.798 19.3175C23.0539 20.6025 22.1378 21.7174 21.0497 22.6622C19.9615 23.607 18.7292 24.344 17.3527 24.8731C15.9762 25.4022 14.5253 25.6667 13 25.6667C11.3073 25.6667 9.68899 25.3313 8.14509 24.6605C6.60119 23.9897 5.2433 23.0307 4.07143 21.7835V25.6667H0.5V14.7824H11.2143V18.4105H5.91295C6.75 19.5443 7.79167 20.4324 9.03795 21.0749C10.2842 21.7174 11.6049 22.0386 13 22.0386Z" />
        </svg> */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M468.9 32.11c13.87 0 27.18 10.77 27.18 27.04v145.9c0 10.59-8.584 19.17-19.17 19.17h-145.7c-16.28 0-27.06-13.32-27.06-27.2c0-6.634 2.461-13.4 7.96-18.9l45.12-45.14c-28.22-23.14-63.85-36.64-101.3-36.64c-88.09 0-159.8 71.69-159.8 159.8S167.8 415.9 255.9 415.9c73.14 0 89.44-38.31 115.1-38.31c18.48 0 31.97 15.04 31.97 31.96c0 35.04-81.59 70.41-147 70.41c-123.4 0-223.9-100.5-223.9-223.9S132.6 32.44 256 32.44c54.6 0 106.2 20.39 146.4 55.26l47.6-47.63C455.5 34.57 462.3 32.11 468.9 32.11z" />
        </svg>
      </button>
    </div>
  );
};

export default React.memo(Input);
