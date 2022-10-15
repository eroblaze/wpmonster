import { useEffect, useState } from "react";

import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "../app/hooks";
import { optimizedSelectWordsState } from "../features/wordsSlice";

const WrongWords = () => {
  const { derivedWrongWords, resultIsOpen } = useAppSelector(
    optimizedSelectWordsState
  );

  const [wrongWords, setWrongWords] = useState<JSX.Element[]>(() => {
    if (derivedWrongWords) {
      const output = derivedWrongWords.map((el) => (
        <span className="small" key={nanoid()}>
          {el}
        </span>
      ));
      return output;
    } else return [];
  });

  useEffect(() => {
    if (resultIsOpen && derivedWrongWords) {
      const output = derivedWrongWords.map((el) => (
        <span className="small" key={nanoid()}>
          {el}
        </span>
      ));
      setWrongWords(output);
    }

    if (resultIsOpen && !derivedWrongWords) {
      setWrongWords([]);
    }
  }, [resultIsOpen, derivedWrongWords]);

  if (derivedWrongWords) {
    if (wrongWords.length) {
      return (
        <div className="wrongWords">
          <div className="h4 wrongWords__title">WRONG WORDS</div>
          <div className="wrongWords__div">{wrongWords}</div>
        </div>
      );
    }
  }

  if (wrongWords.length) {
    return (
      <div className="wrongWords">
        <div className="h4 wrongWords__title">WRONG WORDS</div>
        <div className="wrongWords__div">{wrongWords}</div>
      </div>
    );
  } else {
    return null;
  }
};

export default WrongWords;
