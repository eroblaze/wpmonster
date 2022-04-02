import React, { useContext } from "react";
import "../../Styles/ResultModal.scss";

import Modal from "../Modal/Modal";

import { TypeContext } from "../Type/Type";

interface ResultModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResultModal = ({ modalIsOpen, setModalIsOpen }: ResultModalProps) => {
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
      <>
        <div className="modal-sibling"></div>
        <div className="modal-bg">
          <Modal
            WPM={WPM}
            accuracy={accuracy}
            correctChars={correctChars}
            correctWords={correctWords}
            totalCharTyped={totalCharTyped}
            wrongChars={wrongChars}
            wrongWords={wrongWords}
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            recent
          />
        </div>
      </>
    );
  } else return null;
};

export default ResultModal;
