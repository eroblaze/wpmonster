import { useContext } from "react";
import "../../Styles/ResultModal.scss";

import ResultPresentationalModal from "../ResultPresentationalModal/ResultPresentationModal";
import { ResultModalProps } from "../ResultModal/ResultModal";
import { AppCont } from "../../App";

const HighScoreModal = ({ setModalIsOpen }: ResultModalProps) => {
  const { highScore } = useContext(AppCont);

  const {
    WPM,
    accuracy,
    correctChars,
    correctWords,
    totalCharTyped,
    wrongChars,
    wrongWords,
  } = highScore;

  return (
    <ResultPresentationalModal
      WPM={WPM}
      accuracy={accuracy}
      correctChars={correctChars}
      correctWords={correctWords}
      totalCharTyped={totalCharTyped}
      wrongChars={wrongChars}
      wrongWords={wrongWords}
      setModalIsOpen={setModalIsOpen}
      highScore
    ></ResultPresentationalModal>
  );
};

export default HighScoreModal;
