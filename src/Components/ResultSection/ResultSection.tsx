import { useContext } from "react";
import Modal from "../Modal/Modal";
import { TypeContext } from "../Type/Type";
import "./ResultSection.css";

const ResultSection = () => {
  const { results } = useContext(TypeContext);

  if (results) {
    const {
      WPM,
      wrongChars,
      wrongWords,
      correctChars,
      correctWords,
      totalCharTyped,
      accuracy,
    } = results;

    return (
      <div className="result-section">
        <Modal
          WPM={WPM}
          accuracy={accuracy}
          correctChars={correctChars}
          correctWords={correctWords}
          totalCharTyped={totalCharTyped}
          wrongChars={wrongChars}
          wrongWords={wrongWords}
        />
        <Modal
          WPM={80}
          accuracy={90}
          correctChars={223}
          correctWords={80}
          totalCharTyped={332}
          wrongChars={123}
          wrongWords={2}
        />
      </div>
    );
  } else return null;
};

export default ResultSection;
