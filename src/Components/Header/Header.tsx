import { useContext, useEffect, useRef, useState } from "react";
import { AppCont } from "../../App";
// For the warning notification
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

interface HeaderInterface {
  startTime: number;
  timeArray: number[];
  onTimeChange: (e: number) => void;
  onCaretClick: (isBlockCaret: boolean) => void;
}

const Header = ({
  startTime,
  timeArray,
  onTimeChange,
  onCaretClick,
}: HeaderInterface) => {
  const {
    isBlockCaret,
    shouldShowResultSection,
    setShouldShowResultSection,
    setShowSectionToggle,
    setShowHighScore,
    highScore,
  } = useContext(AppCont);

  const [selectTime, setSelectTime] = useState<JSX.Element[]>([]);

  const hiderRef = useRef<SVGSVGElement | null>(null);
  const canStart = useRef(0);

  // To store the time options and prevent unneccessary rerendering
  useEffect(() => {
    const output = timeArray.map((time) => (
      <span
        key={uuidv4()}
        onClick={verifyTime}
        className={startTime === time ? "time-selected" : ""}
        data-timevalue={time}
      >
        {" "}
        {time}
      </span>
    ));
    setSelectTime(output);
  }, [startTime]);

  useEffect(() => {
    if (hiderRef.current) {
      const { current } = hiderRef;
      if (shouldShowResultSection) {
        if (!canStart.current) canStart.current = 1;
        current.classList.add("hider-active");
        current.classList.remove("hider-deactivate");
      } else {
        if (canStart.current) {
          current.classList.remove("hider-active");
          current.classList.add("hider-deactivate");
        }
      }
    }
    // For the Ctrl + Enter toggle feature
    window.addEventListener("keydown", handleKeysCombination);
    return () => {
      window.removeEventListener("keydown", handleKeysCombination);
    };
  }, [shouldShowResultSection]);

  function handleKeysCombination(e: KeyboardEvent) {
    if (e.key === "Enter" && e.ctrlKey) handleHiderClick();
  }

  const verifyTime = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = e.target as HTMLSpanElement;
    const time = target.getAttribute("data-timevalue");

    if (time) {
      if (+time === startTime) return;
      onTimeChange(+time);
    }
  };

  function handleHiderClick() {
    if (canStart.current) {
      setShouldShowResultSection(!shouldShowResultSection);
      setShowSectionToggle((former) => !former);
    }
  }

  const handleHighScore = () => {
    if (highScore.WPM) setShowHighScore((former) => !former);
    else {
      // If this is the user's first time and he/she is trying to access the personal record modal
      toast.warn("No High Score yet!", {
        progressClassName: "toastify-progress-height",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };

  return (
    <header>
      <div className="logo">
        <h1>
          <span id="wpm-green">wpm</span>onster{" "}
          <span>
            <svg
              id="typing-box-2-hider-svg"
              className={
                canStart.current || shouldShowResultSection ? "hoverable" : ""
              }
              ref={hiderRef}
              onClick={handleHiderClick}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
            >
              <path d="M118.6 105.4l128 127.1C252.9 239.6 256 247.8 256 255.1s-3.125 16.38-9.375 22.63l-128 127.1c-9.156 9.156-22.91 11.9-34.88 6.943S64 396.9 64 383.1V128c0-12.94 7.781-24.62 19.75-29.58S109.5 96.23 118.6 105.4z" />
            </svg>
          </span>
        </h1>
      </div>
      <nav>
        <ul>
          <li title="High Score 🎉">
            <svg
              id="crown"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              onClick={handleHighScore}
            >
              <path d="M576 136c0 22.09-17.91 40-40 40c-.248 0-.4551-.1266-.7031-.1305l-50.52 277.9C482 468.9 468.8 480 453.3 480H122.7c-15.46 0-28.72-11.06-31.48-26.27L40.71 175.9C40.46 175.9 40.25 176 39.1 176c-22.09 0-40-17.91-40-40S17.91 96 39.1 96s40 17.91 40 40c0 8.998-3.521 16.89-8.537 23.57l89.63 71.7c15.91 12.73 39.5 7.544 48.61-10.68l57.6-115.2C255.1 98.34 247.1 86.34 247.1 72C247.1 49.91 265.9 32 288 32s39.1 17.91 39.1 40c0 14.34-7.963 26.34-19.3 33.4l57.6 115.2c9.111 18.22 32.71 23.4 48.61 10.68l89.63-71.7C499.5 152.9 496 144.1 496 136C496 113.9 513.9 96 536 96S576 113.9 576 136z" />
            </svg>
          </li>
          <li>
            Caret:{" "}
            <span
              onClick={() => onCaretClick(true)}
              className={
                isBlockCaret
                  ? "block-caret-span block-caret-active"
                  : "block-caret-span"
              }
            ></span>{" "}
            <span
              onClick={() => onCaretClick(false)}
              className={
                !isBlockCaret
                  ? "thin-caret-span thin-caret-active"
                  : "thin-caret-span"
              }
            ></span>
          </li>
          <li>
            time:
            {selectTime.length === 0
              ? timeArray.map((time) => (
                  <span
                    key={uuidv4()}
                    onClick={verifyTime}
                    className={startTime === time ? "time-selected" : ""}
                    data-timevalue={time}
                  >
                    {" "}
                    {time}
                  </span>
                ))
              : selectTime}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
