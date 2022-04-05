import Modal, { ModalProps } from "../Modal/Modal";

const ResultPresentationalModal = ({
  WPM,
  accuracy,
  correctChars,
  correctWords,
  totalCharTyped,
  wrongChars,
  wrongWords,
  setModalIsOpen,
  highScore,
}: ModalProps) => {
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
          setModalIsOpen={setModalIsOpen}
          recent
          highScore={highScore ? true : false}
        />
      </div>
    </>
  );
};

export default ResultPresentationalModal;
