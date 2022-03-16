import React, { useContext } from "react";
import { TypeContext } from "../Type/Type";
import "./ModalStyle.css";

interface ModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ modalIsOpen, setModalIsOpen }: ModalProps) => {
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
          <div className="result-div">
            <div className="result-title">
              <div className="result-inner-div">
                Result
                <button onClick={() => setModalIsOpen(!modalIsOpen)}>x</button>
              </div>
            </div>
            <div className="result-body">
              <div className="sect-1">
                <div className="wpm-container">
                  <h1 className="wpm wpm-correct wpm-big">{WPM} WPM</h1>
                  <span className="wpm-small">(words per minute)</span>
                </div>
              </div>
              <div className="sect-2">
                <div className="wpm-container">
                  <span className="wpm-labels">Keystrokes</span>
                  <span className="wpm-scores">
                    <span className="wpm-shrink">
                      (<span className="wpm-correct">{correctChars} </span>|
                      <span className="wpm-wrong"> {wrongChars}</span>)
                    </span>{" "}
                    {totalCharTyped}
                  </span>
                </div>
              </div>
              <div className="sect-3">
                <div className="wpm-container">
                  <span className="wpm-labels">Accuracy</span>
                  <span className="wpm-scores" style={{ fontWeight: "bold" }}>
                    {accuracy}%
                  </span>
                </div>
              </div>
              <div className="sect-4">
                <div className="wpm-container">
                  <span className="wpm-labels">Correct words</span>
                  <span
                    className="wpm-scores wpm-correct"
                    style={{ fontWeight: "bold" }}
                  >
                    {correctWords}
                  </span>
                </div>
              </div>
              <div className="sect-5">
                <div className="wpm-container">
                  <span className="wpm-labels">Wrong words</span>
                  <span
                    className="wpm-scores wpm-wrong"
                    style={{ fontWeight: "bold" }}
                  >
                    {wrongWords}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else return null;
};

export default Modal;
