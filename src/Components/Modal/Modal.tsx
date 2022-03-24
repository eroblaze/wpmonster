import React from "react";
import "./ModalStyle.css";

import { ResultInterface } from "../Type/TypeTypes";

interface ModalProps extends ResultInterface {
  highScore?: boolean;
  modalIsOpen?: boolean;
  setModalIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({
  WPM,
  correctChars,
  wrongChars,
  accuracy,
  totalCharTyped,
  correctWords,
  wrongWords,
  modalIsOpen,
  setModalIsOpen,
  highScore,
}: ModalProps) => {
  return (
    <div className="result-div">
      <div className="result-title">
        <div className="result-inner-div">
          Result
          {setModalIsOpen && (
            <button onClick={() => setModalIsOpen(false)}>x</button>
          )}
        </div>
      </div>
      <div className="result-body">
        <div className="sect-1">
          <div className="wpm-container">
            <h1 className="wpm wpm-correct wpm-big">
              {highScore && <span className="high-score"></span>}
              {WPM} WPM
            </h1>
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
  );
};

export default Modal;
