import { useContext } from "react";
import Modal from "../Modal/Modal";
import { TypeContext } from "../Type/Type";
import "./ResultSection.css";

const ResultSection = () => {
  const {
    results,
    highScore: {
      WPM: hWPM,
      accuracy: hAccuracy,
      correctChars: hCorrectChars,
      correctWords: hCorrectWords,
      totalCharTyped: hTotalCharTyped,
      wrongChars: hWrongChars,
      wrongWords: hWrongWords,
    },
  } = useContext(TypeContext);

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
          WPM={hWPM}
          accuracy={hAccuracy}
          correctChars={hCorrectChars}
          correctWords={hCorrectWords}
          totalCharTyped={hTotalCharTyped}
          wrongChars={hWrongChars}
          wrongWords={hWrongWords}
          highScore
        />
        <Modal
          WPM={WPM}
          accuracy={accuracy}
          correctChars={correctChars}
          correctWords={correctWords}
          totalCharTyped={totalCharTyped}
          wrongChars={wrongChars}
          wrongWords={wrongWords}
        />
      </div>
    );
  } else return null;
};

export default ResultSection;
