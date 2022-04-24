import { useContext, useEffect, useState } from "react";
import { TypeContext } from "../Type/Type";
import { v4 as uuidv4 } from "uuid";

const WrongWords = () => {
  const { derivedWrongWords, isOver } = useContext(TypeContext);
  const [showWrongWords, setShowWrongWords] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (isOver && derivedWrongWords) {
      const output = derivedWrongWords.map((el) => (
        <span key={uuidv4()}>{el}</span>
      ));
      setShowWrongWords(output);
    }
  }, [isOver, derivedWrongWords]);

  useEffect(() => {
    if (derivedWrongWords) {
      const output = derivedWrongWords.map((el) => (
        <span key={uuidv4()}>{el}</span>
      ));
      setShowWrongWords(output);
    }
  }, []);

  if (derivedWrongWords) {
    return (
      <div className="wrong-words-container">
        <h3 className="wrong-words-title">WRONG WORDS</h3>

        <div className="wrong-words">{showWrongWords}</div>
      </div>
    );
  } else return null;
};

export default WrongWords;
