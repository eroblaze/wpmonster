import React from "react";

import { ResultInterface } from "../../types/TypeTypes";

export interface ModalProps extends ResultInterface {
  highScore?: boolean;
  setModalIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  recent?: boolean;
}

const Modal = ({
  WPM,
  correctChars,
  wrongChars,
  accuracy,
  totalCharTyped,
  correctWords,
  wrongWords,
  setModalIsOpen,
  highScore,
  recent,
}: ModalProps) => {
  return (
    <div className="result-div">
      {recent && (
        <div className="result-title">
          <div className="result-inner-div">
            Result
            {setModalIsOpen && (
              <button onClick={() => setModalIsOpen(false)}>x</button>
            )}
          </div>
        </div>
      )}
      <div className="result-body">
        <div className="sect-1">
          <div className="wpm-container">
            <h1 className="wpm wpm-correct wpm-big">
              {highScore && (
                <span className="high-score">
                  <svg
                    id="crown2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M576 136c0 22.09-17.91 40-40 40c-.248 0-.4551-.1266-.7031-.1305l-50.52 277.9C482 468.9 468.8 480 453.3 480H122.7c-15.46 0-28.72-11.06-31.48-26.27L40.71 175.9C40.46 175.9 40.25 176 39.1 176c-22.09 0-40-17.91-40-40S17.91 96 39.1 96s40 17.91 40 40c0 8.998-3.521 16.89-8.537 23.57l89.63 71.7c15.91 12.73 39.5 7.544 48.61-10.68l57.6-115.2C255.1 98.34 247.1 86.34 247.1 72C247.1 49.91 265.9 32 288 32s39.1 17.91 39.1 40c0 14.34-7.963 26.34-19.3 33.4l57.6 115.2c9.111 18.22 32.71 23.4 48.61 10.68l89.63-71.7C499.5 152.9 496 144.1 496 136C496 113.9 513.9 96 536 96S576 113.9 576 136z" />
                  </svg>
                </span>
              )}
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
