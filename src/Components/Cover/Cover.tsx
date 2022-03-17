import React, { useContext, useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import { TypeContext } from "../Type/Type";

const howToRestart = () => {
  return (
    <div className="to-restart">
      <h2>
        Press <code style={{ color: "#f3f3f3" }}>f5</code> to restart
      </h2>
    </div>
  );
};

const Cover = () => {
  let [show, setShow] = useState(false);
  let { modalIsOpen } = useContext(TypeContext);

  useEffect(() => {
    if (!show && modalIsOpen) {
      setShow(true);
    }
  }, [modalIsOpen]);

  return (
    <div className="output-sibling">{!show ? <Spinner /> : howToRestart()}</div>
  );
};

export default Cover;
