import { useContext } from "react";
import { TypeContext } from "../Type/Type";

const WrongWords = () => {
  const { derivedWrongWords } = useContext(TypeContext);

  if (derivedWrongWords) {
    return (
      <div className="wrong-words-container">
        <h3 className="wrong-words-title">WRONG WORDS</h3>

        <div className="wrong-words">
          {derivedWrongWords.map((el, idx) => (
            <span key={idx}>{el}</span>
          ))}
        </div>
      </div>
    );
  } else return null;
};

export default WrongWords;
