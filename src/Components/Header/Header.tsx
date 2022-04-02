interface HeaderInterface {
  startTime: number;
  timeArray: number[];
  onTimeChange: (e: number) => void;
}

const Header = ({ startTime, timeArray, onTimeChange }: HeaderInterface) => {
  const verifyTime = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = e.target as HTMLSpanElement;
    const time = target.getAttribute("data-timeValue");

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
            time:
            {timeArray.map((time) => (
              <span
                onClick={verifyTime}
                className={startTime === time ? "time-selected" : ""}
                data-timeValue={time}
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
