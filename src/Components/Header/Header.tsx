import { useContext } from "react";
import { AppCont } from "../../App";
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
  const { isBlockCaret } = useContext(AppCont);

  const verifyTime = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = e.target as HTMLSpanElement;
    const time = target.getAttribute("data-timevalue");

    if (time) {
      if (+time === startTime) return;
      onTimeChange(+time);
    }
  };

  return (
    <header>
      <div className="logo">
        <h1>Typify</h1>
      </div>
      <nav>
        <ul>
          <li>highest score</li>
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
            {timeArray.map((time) => (
              <span
                key={time}
                onClick={verifyTime}
                className={startTime === time ? "time-selected" : ""}
                data-timevalue={time}
              >
                {" "}
                {time}
              </span>
            ))}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
