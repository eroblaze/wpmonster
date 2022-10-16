import { useCallback, useRef, useEffect, FC } from "react";

import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setShowHighScore,
  setShowSettings,
  optimizedSelectAppState,
} from "../features/appSlice";

import {
  optimizedSelectWordsState,
  setDisplayPopUpResult,
  setResultIsOpen,
  changeMode,
} from "../features/wordsSlice";

interface ModalBackgroundI {
  whichModal: "highscore" | "settings" | "popUp";
  handleMenuClicked: (() => void) | null;
  closeAllSettings?: () => void;
  childRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

const ModalBackground: FC<ModalBackgroundI> = ({
  whichModal,
  handleMenuClicked,
  closeAllSettings,
  childRef,
  children,
}) => {
  const dispatch = useAppDispatch();
  const { showHighScore, showSettings } = useAppSelector(
    optimizedSelectAppState
  );
  const { displayPopUpResult, queuedMode } = useAppSelector(
    optimizedSelectWordsState
  );

  const ModalRef = useRef<HTMLDivElement>(null);

  let showModal: boolean;
  let setShowModal: ActionCreatorWithPayload<boolean, string>;
  let setPopUpResult2: ActionCreatorWithPayload<boolean, string> | null;

  if (whichModal === "highscore") {
    showModal = showHighScore;
    setShowModal = setShowHighScore;
  } else if (whichModal === "settings") {
    showModal = showSettings;
    setShowModal = setShowSettings;
  } else {
    showModal = displayPopUpResult;
    setShowModal = setDisplayPopUpResult;
    setPopUpResult2 = setResultIsOpen;
  }

  useEffect(() => {
    if (ModalRef.current) {
      ModalRef.current.addEventListener("click", handleClick);
    }
    // Listen for esc or ctrl + / being pressed in the window
    window.addEventListener("keydown", onWindowKeyDown);

    return () => {
      ModalRef.current?.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", onWindowKeyDown);
    };
  }, [queuedMode]);

  const handleFadeOut = () => {
    if (ModalRef.current) {
      // For small devices
      if (handleMenuClicked) handleMenuClicked();
      // Close the opened settings menu first
      if (closeAllSettings) closeAllSettings();

      ModalRef.current.classList.add("fade-out");

      if (whichModal === "settings" && queuedMode) {
        dispatch(changeMode(queuedMode));
      }

      ModalRef.current.addEventListener(
        "animationend",
        () => {
          // cleanup
          ModalRef.current?.removeEventListener("click", handleClick);
          dispatch(setShowModal(false));
          if (setPopUpResult2) dispatch(setPopUpResult2(false));
        },
        { once: true }
      );
    } else {
      if (handleMenuClicked) handleMenuClicked();
      dispatch(setShowModal(false));
      if (whichModal === "settings" && queuedMode) {
        dispatch(changeMode(queuedMode));
      }
      if (setPopUpResult2) dispatch(setPopUpResult2(false));
    }
  };

  const onWindowKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleFadeOut();
      }
    },
    [queuedMode]
  );

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      const elementClass = element.getAttribute("class");

      if (elementClass === "modal-bg") {
        handleFadeOut();
      } else {
        // The user clicked on the modal itself, not the background
        // Check if the active parts of the settings modal were clicked
        if (
          elementClass !== "section-bg" &&
          elementClass !== "background" &&
          elementClass !== "ignore" &&
          !elementClass?.includes("settings--selected") &&
          !elementClass?.includes("settings__heading") &&
          !elementClass?.includes("thin__caret") &&
          !elementClass?.includes("block__caret")
        ) {
          childRef.current?.classList.remove("wrong-click");
          childRef.current?.classList.add("wrong-click");

          const onAnimationEnd = () => {
            childRef.current?.classList.remove("wrong-click");
            childRef.current?.removeEventListener(
              "animationend",
              onAnimationEnd
            );
          };
          childRef.current?.addEventListener("animationend", onAnimationEnd);
        }
      }
    },
    [queuedMode]
  );

  return (
    <>
      <div className="modal-bg" ref={ModalRef}>
        {children}
      </div>
    </>
  );
};

export default ModalBackground;
