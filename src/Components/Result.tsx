import { useRef, useState, useEffect } from "react";
import ModalBackground from "./ModalBackground";

import { useAppSelector } from "../app/hooks";
import { optimizedSelectWordsState } from "../features/wordsSlice";
import { optimizedSelectAppState } from "../features/appSlice";
import { ResultI } from "../types/appTypes";

const Result = ({
  isHighscore = false,
  handleMenuClicked,
  popUp = false,
}: {
  isHighscore?: boolean;
  handleMenuClicked?: () => void;
  popUp?: boolean;
}) => {
  const resultRef = useRef<HTMLDivElement>(null);

  const resultIsOpen = useAppSelector(optimizedSelectWordsState).resultIsOpen;

  let results = {} as ResultI;
  let gottenResults = {} as ResultI;

  if (isHighscore) {
    gottenResults = useAppSelector(optimizedSelectAppState).highScore;
  } else {
    gottenResults = useAppSelector(optimizedSelectWordsState).results;
  }

  // Needed to prevent immediate showing of new result until after the resultpopup modal is done fading in
  const [localResults, setLocalResults] = useState<ResultI>(gottenResults);

  if (isHighscore) {
    results = gottenResults;
  } else if (popUp) {
    results = gottenResults;
  } else {
    results = localResults;
  }

  const {
    accuracy,
    correctChars,
    correctWords,
    totalCharTyped,
    WPM,
    wrongChars,
    wrongWords,
  } = results;

  useEffect(() => {
    if (resultIsOpen) setLocalResults(gottenResults);
  }, [resultIsOpen]);
  return (
    <>
      {isHighscore || popUp ? (
        <ModalBackground
          whichModal={isHighscore ? "highscore" : "popUp"}
          childRef={resultRef}
          handleMenuClicked={isHighscore ? handleMenuClicked! : null}
        >
          <div className="result result--active" ref={resultRef}>
            <h4 className="h4">
              <span>
                <span className="h2 result__number">{WPM}</span> WPM
              </span>

              {isHighscore && (
                <svg
                  className="result--active__crown"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_23_245"
                    // style="mask-type:alpha"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="1"
                    width="19"
                    height="17"
                  >
                    <path
                      d="M5.14587 16.625H13.8542L16.2292 8.3125L12.2709 10.2917L9.50004 4.75L6.72921 10.2917L2.77087 8.3125L5.14587 16.625Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.77087 8.3125C3.42671 8.3125 3.95837 7.78084 3.95837 7.125C3.95837 6.46916 3.42671 5.9375 2.77087 5.9375C2.11504 5.9375 1.58337 6.46916 1.58337 7.125C1.58337 7.78084 2.11504 8.3125 2.77087 8.3125Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M9.5 4.75C10.1558 4.75 10.6875 4.21834 10.6875 3.5625C10.6875 2.90666 10.1558 2.375 9.5 2.375C8.84416 2.375 8.3125 2.90666 8.3125 3.5625C8.3125 4.21834 8.84416 4.75 9.5 4.75Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M16.2292 8.3125C16.885 8.3125 17.4167 7.78084 17.4167 7.125C17.4167 6.46916 16.885 5.9375 16.2292 5.9375C15.5733 5.9375 15.0417 6.46916 15.0417 7.125C15.0417 7.78084 15.5733 8.3125 16.2292 8.3125Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </mask>
                  <g mask="url(#mask0_23_245)">
                    <path
                      d="M0 0H19V19H0V0Z"
                      fill="url(#paint0_linear_23_245)"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_23_245"
                      x1="-1.615"
                      y1="9.54726"
                      x2="20.52"
                      y2="9.54726"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#00E5B0" />
                      <stop offset="1" stopColor="#202020" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
            </h4>
            <div>
              <span>Chars</span>
              <span>
                (<span className="correct small">{correctChars}</span> |{" "}
                <span className="wrong small">{wrongChars}</span>){" "}
                <span className="chars">{totalCharTyped}</span>
              </span>
            </div>
            <div>
              <span>Accuracy</span>{" "}
              <span className="small">
                <span className="accuracy">{accuracy}</span>%
              </span>
            </div>
            <div>
              <span>Correct</span>{" "}
              <span className="correct small">{correctWords}</span>
            </div>
            <div>
              <span>Wrong</span>{" "}
              <span className="wrong small">{wrongWords}</span>
            </div>
          </div>
        </ModalBackground>
      ) : (
        <div className="result" ref={resultRef}>
          <h4 className="h4">
            <span>
              <span className="h2 result__number">{WPM}</span> WPM
            </span>
          </h4>
          <div>
            <span>Chars</span>
            <span>
              (<span className="correct small">{correctChars}</span> |{" "}
              <span className="wrong small">{wrongChars}</span>){" "}
              <span className="chars">{totalCharTyped}</span>
            </span>
          </div>
          <div>
            <span>Accuracy</span>{" "}
            <span className="small">
              <span className="accuracy">{accuracy}</span>%
            </span>
          </div>
          <div>
            <span>Correct</span>{" "}
            <span className="correct small">{correctWords}</span>
          </div>
          <div>
            <span>Wrong</span> <span className="wrong small">{wrongWords}</span>
          </div>
        </div>
      )}
      {/* <div
        className={isHighscore ? "modal-bg" : ""}
        ref={isHighscore ? highScoreRef : null}
      >
        <div
          className={isHighscore ? "result result--active" : "result"}
          ref={resultRef}
        >
          <h4 className="h4">
            <span>
              <span className="h2 result__number">90</span> WPM
            </span>
            {isHighscore && (
              <svg
                className="result--active__crown"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_23_245"
                  // style="mask-type:alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="1"
                  width="19"
                  height="17"
                >
                  <path
                    d="M5.14587 16.625H13.8542L16.2292 8.3125L12.2709 10.2917L9.50004 4.75L6.72921 10.2917L2.77087 8.3125L5.14587 16.625Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.77087 8.3125C3.42671 8.3125 3.95837 7.78084 3.95837 7.125C3.95837 6.46916 3.42671 5.9375 2.77087 5.9375C2.11504 5.9375 1.58337 6.46916 1.58337 7.125C1.58337 7.78084 2.11504 8.3125 2.77087 8.3125Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path
                    d="M9.5 4.75C10.1558 4.75 10.6875 4.21834 10.6875 3.5625C10.6875 2.90666 10.1558 2.375 9.5 2.375C8.84416 2.375 8.3125 2.90666 8.3125 3.5625C8.3125 4.21834 8.84416 4.75 9.5 4.75Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path
                    d="M16.2292 8.3125C16.885 8.3125 17.4167 7.78084 17.4167 7.125C17.4167 6.46916 16.885 5.9375 16.2292 5.9375C15.5733 5.9375 15.0417 6.46916 15.0417 7.125C15.0417 7.78084 15.5733 8.3125 16.2292 8.3125Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="2"
                  />
                </mask>
                <g mask="url(#mask0_23_245)">
                  <path d="M0 0H19V19H0V0Z" fill="url(#paint0_linear_23_245)" />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_23_245"
                    x1="-1.615"
                    y1="9.54726"
                    x2="20.52"
                    y2="9.54726"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#00E5B0" />
                    <stop offset="1" stopColor="#202020" />
                  </linearGradient>
                </defs>
              </svg>
            )}
          </h4>
          <div>
            <span>Chars</span>
            <span>
              (<span className="correct small">214</span> |{" "}
              <span className="wrong small">20</span>){" "}
              <span className="chars">334</span>
            </span>
          </div>
          <div>
            <span>Accuracy</span>{" "}
            <span className="small">
              <span className="accuracy">98</span>%
            </span>
          </div>
          <div>
            <span>Correct</span> <span className="correct small">214</span>
          </div>
          <div>
            <span>Wrong</span> <span className="wrong small">20</span>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Result;
