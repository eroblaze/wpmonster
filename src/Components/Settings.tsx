import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ModalBackground from "./ModalBackground";

import { nanoid } from "@reduxjs/toolkit";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  optimizedSelectAppState,
  setStartTime,
  setIsBlockCaret,
} from "../features/appSlice";
import {
  optimizedSelectWordsState,
  setQueuedMode,
} from "../features/wordsSlice";

let showMenu: Record<string, boolean> = {
  mode: false,
  time: false,
  caret: false,
  keybinds: false,
};

let previouslyOpened: string | undefined;
let localMode = "";

const Settings = ({ handleMenuClicked }: { handleMenuClicked: () => void }) => {
  const dispatch = useAppDispatch();
  const { hasGameStarted, isBlockCaret, startTime, timeArray } = useAppSelector(
    optimizedSelectAppState
  );
  const { mode } = useAppSelector(optimizedSelectWordsState);

  const settingsRef = useRef<HTMLDivElement>(null);
  const q = gsap.utils.selector(settingsRef);

  useEffect(() => {
    localMode = mode;
  }, [mode]);

  const handleTimeChange = (time: number) => {
    if (!hasGameStarted && time !== startTime) dispatch(setStartTime(time));
  };

  const handleCaretClick = (caret: boolean) => {
    if (!hasGameStarted && caret !== isBlockCaret)
      dispatch(setIsBlockCaret(caret));
  };

  const verifyTime = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = e.target as HTMLSpanElement;
    const time = target.getAttribute("data-timevalue");

    if (time) {
      handleTimeChange(+time);
    }
  };

  const animate = (element: string, display: boolean) => {
    if (display) {
      document.documentElement.style.setProperty(
        "--settings-element-height",
        `${q(element)[0].scrollHeight}px`
      );

      q(element)[0].classList.add("open");
    } else {
      q(element)[0].classList.remove("open");
    }
  };

  const closePreviouslyOpened = (element: string) => {
    q(element)[0].classList.remove("open");
  };

  // const animate = (element: string, display: boolean) => {
  //   if (display) {
  //     gsap.set(q(element), { height: "auto" });
  //     gsap.from(q(element), { duration: 1, height: 0 });
  //   } else {
  //     gsap.to(q(element), { duration: 1, height: 0 });
  //   }
  // };

  // const closePreviouslyOpened = (element: string) => {
  //   gsap.to(q(element), { duration: 1, height: 0 });
  // };

  const handleClick = (cartegory: string) => {
    const stringEnd = cartegory.split("-")[1];
    showMenu[stringEnd] = !showMenu[stringEnd];

    if (
      showMenu[stringEnd] &&
      previouslyOpened &&
      previouslyOpened !== cartegory
    ) {
      closePreviouslyOpened(`.${previouslyOpened}`);
      const stringEnd = previouslyOpened.split("-")[1];
      showMenu[stringEnd] = !showMenu[stringEnd];
    }

    previouslyOpened = cartegory !== previouslyOpened ? cartegory : undefined;
    animate(`.${cartegory}`, showMenu[stringEnd]);
  };

  const handleCloseSettings = () => {
    if (previouslyOpened) {
      closePreviouslyOpened(`.${previouslyOpened}`);
      const stringEnd = previouslyOpened.split("-")[1];
      showMenu[stringEnd] = !showMenu[stringEnd];
      previouslyOpened = undefined;
    }
  };

  return (
    <ModalBackground
      childRef={settingsRef}
      whichModal="settings"
      closeAllSettings={handleCloseSettings}
      handleMenuClicked={handleMenuClicked}
    >
      <div className="settings" ref={settingsRef}>
        <section
          className="section-bg"
          onClick={() => handleClick("settings-mode")}
        >
          <div className="background">
            <span className="ignore"></span>
            <span className="ignore"></span>
            <span className="ignore"></span>
          </div>
          <h4 className="settings__heading h3">WORDS</h4>
        </section>
        <div className="settings__options-div  settings-mode">
          <p
            className={mode === "common" ? "settings--selected" : "ignore"}
            onClick={(e) => {
              if (localMode !== "common") {
                localMode = "common";

                const el = e.target as HTMLParagraphElement;
                el.nextElementSibling?.classList.remove("settings--selected");
                el.nextElementSibling?.classList.add("ignore");

                el.classList.remove("ignore");
                el.classList.add("settings--selected");

                dispatch(setQueuedMode("common"));
              }
            }}
          >
            common
          </p>
          <p
            className={mode === "complex" ? "settings--selected" : "ignore"}
            onClick={(e) => {
              if (localMode !== "complex") {
                localMode = "complex";

                const el = e.target as HTMLParagraphElement;
                el.previousElementSibling?.classList.remove(
                  "settings--selected"
                );
                el.previousElementSibling?.classList.add("ignore");

                el.classList.remove("ignore");
                el.classList.add("settings--selected");

                dispatch(setQueuedMode("complex"));
              }
            }}
          >
            complex
          </p>
        </div>
        <section
          className="section-bg"
          onClick={() => handleClick("settings-time")}
        >
          <div className="background">
            <span className="ignore"></span>
            <span className="ignore"></span>
            <span className="ignore"></span>
          </div>
          <h4 className="settings__heading h3 clickable">TIME</h4>
        </section>

        <div className="settings__options-div  settings-time">
          {timeArray.map((time) => (
            <p
              key={nanoid()}
              onClick={verifyTime}
              className={startTime === time ? "settings--selected" : "ignore"}
              data-timevalue={time}
            >
              {time}
            </p>
          ))}
        </div>

        <section
          className="section-bg"
          onClick={() => handleClick("settings__caret")}
        >
          <div className="background">
            <span className="ignore"></span>
            <span className="ignore"></span>
            <span className="ignore"></span>
          </div>
          <h4 className="settings__heading h3 clickable">CARET</h4>
        </section>

        <div className="settings__options-div  settings__caret">
          <p
            onClick={() => handleCaretClick(false)}
            className={!isBlockCaret ? "settings--selected" : "ignore"}
          >
            <span
              className={
                !isBlockCaret
                  ? "thin__caret thin__caret--active"
                  : "thin__caret"
              }
            ></span>
          </p>
          <p
            onClick={() => handleCaretClick(true)}
            className={isBlockCaret ? "settings--selected" : "ignore"}
          >
            <span
              className={
                isBlockCaret
                  ? "block__caret block__caret--active"
                  : "block__caret"
              }
            ></span>
          </p>
        </div>

        <section
          className="section-bg"
          onClick={() => handleClick("settings-keybinds")}
        >
          <div className="background">
            <span className="ignore"></span>
            <span className="ignore"></span>
            <span className="ignore"></span>
          </div>
          <h4 className="settings__heading h3 clickable">KEYBINDS</h4>
        </section>
        <div className="settings__options-div  settings-keybinds">
          <div className="small">
            <code>f5</code> - restart test
          </div>
          <div className="small">
            <code>esc</code> - close modal
          </div>
          <div className="small">
            <code>ctrl/cmd</code> + <code>/</code> - toggle caret
          </div>
          <div className="small">
            <code>ctrl/cmd</code> + <code>enter</code> - toggle result
          </div>
        </div>
      </div>
    </ModalBackground>
  );
};

export default Settings;
