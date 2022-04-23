import React, { useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Cover from "../Cover/Cover";
import Caret from "../Caret/Caret";

import { TypeContext } from "../Type/Type";
import { AppCont } from "../../App";

let wordsPrevLength = 0;
let pastColorPrevLength = 0;
let caretChanged = false;
let spaceCountPrev = 0;
let pastColorHasChanged = false;
interface DicInterface {
  spaceCount: number;
}

const Div = ({ spaceCount }: DicInterface): JSX.Element => {
  const [mainState, setMainState] = useState<JSX.Element[]>([]);

  // console.count("WordsDiv component rendered");
  const { isBlockCaret } = useContext(AppCont);
  const { isOver } = useContext(TypeContext);
  const { words, pastColor, restart, caretRef } = useContext(TypeContext);
  const wordsArr = words.split(" ");

  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const currentWordRef = useRef<HTMLDivElement>(null);

  if (wordsPrevLength === 0) wordsPrevLength = words.length;
  if (!pastColorHasChanged) {
    pastColorPrevLength = pastColor[1].length;
    pastColorHasChanged = true;
    caretChanged = isBlockCaret;
  }

  // Testing
  useEffect(() => {
    // console.log("mainState changed", mainState.length);
  }, [mainState]);
  // EndTesting

  useEffect(() => {
    initialRendering();
  }, []);

  useEffect(() => {
    if (restart) {
      wordsPrevLength = 0;
      pastColorPrevLength = 0;
      caretChanged = false;
      spaceCountPrev = 0;
      pastColorHasChanged = false;
      initialRendering();
    }
  }, [restart]);

  useEffect(() => {
    // This is important so as to prevent it from scrolling back after the words-container div has been scrolled up
    if (!isOver) {
      if (currentWordRef.current) {
        // On every render, scroll the current word to the center
        const { current } = currentWordRef;
        current.scrollIntoView({
          block: "center",
        });
      }
    }

    if (
      pastColor[1].length !== pastColorPrevLength ||
      words.length !== wordsPrevLength ||
      isBlockCaret !== caretChanged ||
      spaceCount !== spaceCountPrev
    ) {
      // Remove caret from previous word
      if (spaceCount !== spaceCountPrev) {
        console.log("spacebar");
        mainAction(true);
        spaceCountPrev = spaceCount;
        // console.log(pastColor);
      }
      mainAction();
      // End Action
    }
  });

  useEffect(() => {
    if (isOver) {
      if (wordsContainerRef.current) {
        // This scrolls the wordsContainer back to the top if not, it breaks
        wordsContainerRef.current.scrollTo(0, 0);
      }
    }
  }, [isOver]);

  function initialRendering() {
    const lastIdx = wordsArr.length - 1; // last word index in the array

    const output = wordsArr.map((word, idx) => {
      const isCurrentWord = idx === spaceCount;
      const letterArr = word.split("");

      return (
        <div
          className="each-word"
          key={uuidv4()}
          ref={isCurrentWord ? currentWordRef : null}
        >
          {isCurrentWord && (
            <Caret ref={caretRef} putBlockClass={isBlockCaret} />
          )}

          {letterArr.map((letter) => {
            const returnLetterSpan = <span key={uuidv4()}>{letter}</span>;

            return returnLetterSpan;
          })}
          {idx !== lastIdx ? <span className="spaces">{"s"}</span> : ""}
        </div>
      );
    });

    setMainState(output);
  }

  function mainAction(removeCaret: boolean = false): void {
    // Get the current word from the state and update it with the new color
    const pick = !removeCaret ? 1 : 0;

    setMainState((prev) => {
      let toChange = !removeCaret
        ? wordsArr[spaceCount]
        : wordsArr[spaceCount - 1];
      if (toChange) {
        const output = (
          <div
            className="each-word"
            key={uuidv4()}
            ref={!removeCaret ? currentWordRef : null}
          >
            {!removeCaret && (
              <Caret ref={caretRef} putBlockClass={isBlockCaret} />
            )}

            {toChange.split("").map((letter, index) => {
              const returnLetterSpan = (
                <span
                  key={uuidv4()}
                  style={{
                    color:
                      pastColor[pick][index] === "rgb(226, 5, 5)"
                        ? isBlockCaret
                          ? pastColor[pick][index]
                          : "black"
                        : pastColor[pick][index],

                    backgroundColor:
                      pastColor[pick][index] === "rgb(226, 5, 5)"
                        ? isBlockCaret
                          ? undefined
                          : pastColor[pick][index]
                        : undefined,
                  }}
                >
                  {letter}
                </span>
              );

              return returnLetterSpan;
            })}
            {spaceCount <= wordsArr.length - 1 ? (
              <span className="spaces">{"s"}</span>
            ) : (
              ""
            )}
          </div>
        );

        const before = !removeCaret
          ? prev.slice(0, spaceCount)
          : prev.slice(0, spaceCount - 1);
        const after = !removeCaret
          ? prev.slice(spaceCount + 1)
          : prev.slice(spaceCount);
        return [...before, output, ...after];
      } else return prev;
    });

    wordsPrevLength = words.length;
    pastColorPrevLength = pastColor[1].length;
    caretChanged = isBlockCaret;
  }

  return (
    <div
      data-testid="words-div"
      className="words-container"
      ref={wordsContainerRef}
    >
      {isOver && <Cover />}
      {restart && <Cover />}
      {mainState}
    </div>
  );
};

export default React.memo(Div);
