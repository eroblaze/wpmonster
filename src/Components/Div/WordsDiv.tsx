import React, { useContext, useEffect, useRef } from "react";

import Cover from "../Cover/Cover";
import Caret from "../Caret/Caret";

import { TypeContext } from "../Type/Type";
import { AppCont } from "../../App";

interface DicInterface {
  spaceCount: number;
}

const Div = ({ spaceCount }: DicInterface): JSX.Element => {
  const isBlockCursor = false;

  const { isOver } = useContext(AppCont);
  const { words, pastColor, restart, caretRef } = useContext(TypeContext);

  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const currentWordRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(1);

  let pCIdx = -1; // To get the colors from pastColor array

  useEffect(() => {
    if (currentWordRef.current) {
      // On every render, scroll the current word to the center
      const { current } = currentWordRef;
      current.scrollIntoView({
        block: "center",
      });
    }
  });

  useEffect(() => {
    if (restart || isOver) {
      if (wordsContainerRef.current) {
        // This scrolls the wordsContainer back to the top if not, it breaks
        wordsContainerRef.current.scrollTo(0, 0);
      }
    }
  }, [restart, isOver]);

  useEffect(() => {
    console.log(`pCIdx : ${pCIdx}`);
    console.log(`Div component rendered : ${rendered.current++}`);
  });

  const wordsArr = words.split(" ");
  const lastIdx = wordsArr.length - 1; // last word index in the array

  const output = wordsArr.map((word, idx) => {
    const isCurrentWord = idx === spaceCount;
    const letterArr = word.split("");

    return (
      <div
        className="each-word"
        key={idx}
        ref={isCurrentWord ? currentWordRef : null}
      >
        {isCurrentWord && (
          <Caret ref={caretRef} putBlockClass={isBlockCursor} />
        )}

        {letterArr.map((letter, index) => {
          pCIdx++;

          const returnLetterSpan = (
            <span
              key={index}
              data-testid={`div${pCIdx}`}
              style={{
                color:
                  pastColor[pCIdx] === "rgb(226, 5, 5)"
                    ? isBlockCursor
                      ? pastColor[pCIdx]
                      : "black"
                    : pastColor[pCIdx],
                backgroundColor:
                  pastColor[pCIdx] === "rgb(226, 5, 5)"
                    ? isBlockCursor
                      ? undefined
                      : pastColor[pCIdx]
                    : undefined,
              }}
            >
              {letter}
            </span>
          );

          if (index === letterArr.length - 1) {
            // This is important inorder to get the space index in pastColor array
            pCIdx++;
          }
          return returnLetterSpan;
        })}
        {idx !== lastIdx ? (
          <span data-testid={`div${pCIdx}`} className="spaces">
            {"s"}
          </span>
        ) : (
          ""
        )}
      </div>
    );
  });

  return (
    <div
      data-testid="words-div"
      className="words-container"
      ref={wordsContainerRef}
    >
      {isOver && <Cover />}
      {restart && <Cover />}
      {output}
    </div>
  );
};

export default React.memo(Div);
