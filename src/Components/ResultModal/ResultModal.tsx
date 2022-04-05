import React, { useContext } from "react";
import "../../Styles/ResultModal.scss";

import ResultPresentationalModal from "../ResultPresentationalModal/ResultPresentationModal";
import { TypeContext } from "../Type/Type";

export interface ResultModalProps {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResultModal = ({ setModalIsOpen }: ResultModalProps) => {
  const { results } = useContext(TypeContext);

  if (results) {
    const {
      WPM,
      accuracy,
      correctChars,
      correctWords,
      totalCharTyped,
      wrongChars,
      wrongWords,
    } = results;

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
      ></ResultPresentationalModal>
    );
  } else return null;
};

export default ResultModal;
