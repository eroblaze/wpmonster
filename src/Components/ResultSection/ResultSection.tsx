import { useContext } from "react";
import Modal from "../Modal/Modal";
import WrongWords from "../WrongWords/WrongWords";
import { TypeContext } from "../Type/Type";

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
      <>
        <Modal
          WPM={WPM}
          accuracy={accuracy}
          correctChars={correctChars}
          correctWords={correctWords}
          totalCharTyped={totalCharTyped}
          wrongChars={wrongChars}
          wrongWords={wrongWords}
        />
        <WrongWords />
      </>
    );
  } else return null;
};

export default ResultSection;
