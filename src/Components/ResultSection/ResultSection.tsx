import React from "react";
import Modal from "../Modal/Modal";
import "./ResultSection.css";

const ResultSection = () => {
  return (
    <div className="result-section">
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
};

export default ResultSection;
