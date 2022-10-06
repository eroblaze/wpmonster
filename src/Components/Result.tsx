const Result = () => {
  return (
    <div className="result">
      <h4 className="h4">
        <span>
          <span className="h2 result__number">90</span> WPM
        </span>
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
  );
};

export default Result;
