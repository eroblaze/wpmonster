import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

import { useAppSelector } from "../app/hooks";
import { optimizedSelectWordsState } from "../features/wordsSlice";

const howToRestart = () => {
  return (
    <div className="to-restart">
      <p>
        Press <code>f5</code> to restart
      </p>
    </div>
  );
};

const Cover = () => {
  const { restart, resultIsOpen } = useAppSelector(optimizedSelectWordsState);

  const [show, setShow] = useState(false);

  let output: JSX.Element;

  if (!restart && show) {
    output = howToRestart();
  } else {
    output = <Spinner />;
  }

  useEffect(() => {
    if (!show && resultIsOpen) {
      setShow(true);
    }
  }, [resultIsOpen]);

  return <div className="cover-bg">{output}</div>;
};

export default React.memo(Cover);
