import React, { useEffect, useRef, useState } from "react";

import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "../app/hooks";
import { optimizedSelectWordsState } from "../features/wordsSlice";
import { optimizedSelectAppState } from "../features/appSlice";

import Caret from "./Caret";
import Cover from "./Cover";

let wordsPrevLength = 0;
let pastColorPrevLength = 0;
let caretChanged = false;
let spaceCountPrev = 0;

interface WordsI {
  spaceCount: number;
  caretRef: React.RefObject<HTMLSpanElement>;
}

const Words = ({ spaceCount, caretRef }: WordsI) => {
  const { isBlockCaret } = useAppSelector(optimizedSelectAppState);
  const {
    isOver,
    wordsToDisplay: words,
    previousColor: pastColor,
    restart,
  } = useAppSelector(optimizedSelectWordsState);

  const [mainState, setMainState] = useState<JSX.Element[]>([]);

  const wordsArr = words.split(" ");

  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const currentWordRef = useRef<HTMLDivElement>(null);

  if (wordsPrevLength === 0) wordsPrevLength = words.length;

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
          // behavior: "smooth",
        });
      }
    }

    if (pastColor.length) {
      if (
        pastColor[1].length !== pastColorPrevLength ||
        words.length !== wordsPrevLength ||
        isBlockCaret !== caretChanged ||
        spaceCount !== spaceCountPrev
      ) {
        // Remove caret from previous word
        if (spaceCount !== spaceCountPrev) {
          mainAction(true);
          spaceCountPrev = spaceCount;
        }

        mainAction();
        // End Action
      }
    }
  });

  useEffect(() => {
    if (restart || isOver) {
      if (wordsContainerRef.current) {
        // This scrolls the wordsContainer back to the top if not, it breaks
        wordsContainerRef.current.scrollTo(0, 0);
      }
    }
  }, [isOver, restart]);

  function initialRendering() {
    const lastIdx = wordsArr.length - 1; // last word index in the array

    const output = wordsArr.map((word, idx) => {
      const isCurrentWord = idx === spaceCount;
      const letterArr = word.split("");

      return (
        <div
          className="each-word"
          key={nanoid()}
          ref={isCurrentWord ? currentWordRef : null}
        >
          {isCurrentWord && <Caret ref={caretRef} />}

          {letterArr.map((letter) => {
            const returnLetterSpan = <span key={nanoid()}>{letter}</span>;

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
            key={nanoid()}
            ref={!removeCaret ? currentWordRef : null}
          >
            {!removeCaret && <Caret ref={caretRef} />}

            {toChange.split("").map((letter, index) => {
              const letterClass = pastColor[pick][index];

              const returnLetterSpan = (
                <span
                  key={nanoid()}
                  className={
                    isBlockCaret
                      ? `${letterClass} blockCaret`
                      : `${letterClass}`
                  }
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
      ref={wordsContainerRef}
      data-testid="words-div"
      className="h4 words-font words"
    >
      {isOver && <Cover />}
      {restart && <Cover />}
      {mainState}
    </div>
  );
};

export default React.memo(Words);
