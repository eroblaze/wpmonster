import React, { useState, useEffect, useRef, useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  optimizedSelectAppState,
  setHighScore,
  setHasGameStarted,
  setIsBlockCaret,
  setShouldShowOtherContainer,
} from "../features/appSlice";
import {
  optimizedSelectWordsState,
  changePreviousColor,
  restartApp,
  setDerivedWrongWords,
  setIsOver,
  setRestart,
  setResultIsOpen,
  setDisplayPopUpResult,
  setResults,
  setStartAnimating,
  setUserIn,
  setWasDoneEarly,
  setWordsToDisplay,
  clearPreviousColor,
  setQueuedMode,
} from "../features/wordsSlice";

import Timer from "./Timer";
import WordsDiv from "./WordsDiv";

// For notifications
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Helpers
import generateWpm from "../Helpers/Generate_wpm";
import { KeyDownExtension, TColor, TInputEvent } from "../types/wordsTypes";

import { ResultI } from "../types/appTypes";

// useful variables / bindings
let everyIndexBeforeSpace: number[] = [];
let dataToCheck: (number | string)[] = [];
let backKeyPressed = 0;
let splittedArr: string[] = [];
let pastColor: string[] = [];
let spaceSplit: string[] = [];
let counter = 0;
let spaceEnteredByUser = 0;
let totalSpaceInitially = 0;
let globalCount = 0;
let extraCount = 0;
const allCallbackIds: number[] = [];
// For the timer
let timeHasStarted = false;
// const startTime = 30;
const loadTime = 1000;
// For the main function's context
let char: string;
let value: string;
let valueLen: number;
let valueLenInd: number;
let isWrong = false;
let spaceBar = true;
// When to show Result Section
let isSubmitting = false;
let spaceCountPrev = 0;
let previousMode = "";

function clearAllEntries(): void {
  everyIndexBeforeSpace = [];
  dataToCheck = [];
  splittedArr = [];
  pastColor = [];
  spaceSplit = [];
  counter = 0;
  spaceEnteredByUser = 0;
  globalCount = 0;
  extraCount = 0;
  timeHasStarted = false;
  char = "";
  value = "";
  valueLen = 0;
  valueLenInd = 0;
  isWrong = false;
  spaceCountPrev = 0;
  spaceBar = true;
}

const WordsDivContainer = () => {
  const {
    isBlockCaret,
    hasGameStarted,
    startTime,
    showHighScore,
    showOtherContainerIfItWasShown,
  } = useAppSelector(optimizedSelectAppState);
  const {
    wordsToDisplay,
    mode,
    isOver,
    resultIsOpen,
    restart,
    wasDoneEarly,
    results,
    userIn,
    displayPopUpResult,
  } = useAppSelector(optimizedSelectWordsState);
  const dispatch = useAppDispatch();

  // states
  const [colorId, setColor] = useState<TColor>({} as TColor);

  const [fake, setFake] = useState(false);
  // end states

  const caretRef = useRef<HTMLSpanElement>(null);

  const resultsRef = useRef<number>(
    JSON.parse(localStorage.getItem("highScore") || JSON.stringify({ WPM: -1 }))
      .WPM
  );

  const onWindowKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "/" && e.ctrlKey && !hasGameStarted) {
        dispatch(setIsBlockCaret(!isBlockCaret));
      }
    },
    [isBlockCaret, hasGameStarted]
  );

  // start initialization
  useEffect(() => {
    window.addEventListener("keydown", onWindowKeyDown);

    return () => {
      window.removeEventListener("keydown", onWindowKeyDown);
    };
  }, [isBlockCaret, hasGameStarted]);

  // This is necessary inorder to set the highScore state to what was retrieved from the local storage
  useEffect(() => {
    previousMode = mode;
    const highScoreObj: ResultI = JSON.parse(
      localStorage.getItem("highScore") || JSON.stringify({})
    );
    dispatch(setHighScore(highScoreObj));

    //cleanup
    return () => {
      allCallbackIds.forEach((id) => clearInterval(id));
    };
  }, []);

  useEffect(() => {
    if (mode !== previousMode) {
      handleRestart();
      previousMode = mode;
    }
  }, [mode]);

  useEffect(() => {
    splittedArr = wordsToDisplay.split("");
  }, [wordsToDisplay]);

  useEffect(() => {
    spaceSplit = wordsToDisplay.split(" ");
    totalSpaceInitially = spaceSplit.length - 1;
    splittedArr = wordsToDisplay.split(""); // This is neccessary to re-create this array after every restart
  }, [restart]);

  useEffect(() => {
    if (isOver && !wasDoneEarly) {
      isSubmitting = true;
      dispatch(setUserIn("")); // Clear the input field
      dispatch(setHasGameStarted(false));

      const id2 = setTimeout(() => {
        // To generate the wpm
        getWrongWords();
        dispatch(setDisplayPopUpResult(true));
      }, loadTime - 200);

      const id = setTimeout(() => {
        isSubmitting = false;

        dispatch(setResultIsOpen(true));

        // Only show Other container if it was already being displayed
        if (showOtherContainerIfItWasShown) {
          dispatch(setShouldShowOtherContainer(true));

          const root = document.querySelector("#root") as HTMLElement;
          // For mobile
          const foundOrNot = document.querySelector(
            ".onlyWords__margin-bottom"
          ) as HTMLElement;
          const docRoot = document.documentElement;
          if (foundOrNot) {
            // This means the header already has margin-bottom
            docRoot.style.setProperty("--wordsDivContainer-m-top-js", "0px");
          } else {
            docRoot.style.setProperty(
              "--wordsDivContainer-m-top-js",
              "var(--wordsDivContainer-m-top)"
            );
          }

          root.classList.remove("onlyWords");
        }
      }, loadTime); // For the Modal Result
      allCallbackIds.push(id, id2);
    }
  }, [isOver]);

  useEffect(() => {
    // To set an highscore
    if (results && results.WPM > resultsRef.current) {
      dispatch(setHighScore(results));
      localStorage.setItem("highScore", JSON.stringify(results));
      resultsRef.current = results.WPM;
      if (displayPopUpResult) showToastify();
    }
  }, [results]);
  // end initialization

  const finishedEarly = (timeTaken: number) => {
    dispatch(setIsOver(true)); // Game over
    isSubmitting = true;
    dispatch(setUserIn("")); // Clear the input field
    dispatch(setHasGameStarted(false));

    const id2 = setTimeout(() => {
      // To generate the wpm
      getWrongWords(timeTaken);
      dispatch(setDisplayPopUpResult(true));
    }, loadTime - 150);

    const id = setTimeout(() => {
      isSubmitting = false;
      dispatch(setResultIsOpen(true));

      // Only show Other container if it was already being displayed
      if (showOtherContainerIfItWasShown) {
        dispatch(setShouldShowOtherContainer(true));

        const root = document.querySelector("#root") as HTMLElement;
        // For mobile
        const foundOrNot = document.querySelector(
          ".onlyWords__margin-bottom"
        ) as HTMLElement;
        const docRoot = document.documentElement;
        if (foundOrNot) {
          // This means the header already has margin-bottom
          docRoot.style.setProperty("--wordsDivContainer-m-top-js", "0px");
        } else {
          docRoot.style.setProperty(
            "--wordsDivContainer-m-top-js",
            "var(--wordsDivContainer-m-top)"
          );
        }

        root.classList.remove("onlyWords");
      }
    }, loadTime);

    allCallbackIds.push(id, id2);
  };

  function getWrongWords(timeTaken?: number) {
    const {
      wrongWordsIdx,
      WPM,
      accuracy,
      correctChars,
      correctWords,
      totalCharTyped,
      wrongChars,
      wrongWords,
    } = generateWpm(timeTaken === undefined ? startTime : timeTaken, pastColor);

    const gottenWrongWords = wrongWordsIdx.map((el) => spaceSplit[el]);

    if (gottenWrongWords.length)
      dispatch(setDerivedWrongWords(gottenWrongWords));
    else dispatch(setDerivedWrongWords(null)); // Get rid of what was there before

    dispatch(
      setResults({
        WPM,
        accuracy,
        correctChars,
        correctWords,
        totalCharTyped,
        wrongChars,
        wrongWords,
      })
    );
  }

  function showToastify() {
    // For the Toastify component
    toast.success("New high score!", {
      progressClassName: "toastify-progress-height",
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  }

  function wrapperSetWords(startInd: number, excess: string): void {
    const cpFirst = wordsToDisplay.slice(0, startInd);
    const cpLast = wordsToDisplay.slice(startInd);
    const newState = cpFirst + excess[excess.length - 1] + cpLast;
    dispatch(setWordsToDisplay(newState));
  }

  function addMoreLetters(): void {
    // space bar hasn't been pressed i.e still in the first word
    if (!counter) {
      if (valueLenInd > everyIndexBeforeSpace[0]) {
        extraCount++;
        const startInd = everyIndexBeforeSpace[0] + 1;
        const excess = value.slice(startInd);

        wrapperSetWords(startInd, excess);
      }
    } else {
      const diff =
        everyIndexBeforeSpace[counter] - everyIndexBeforeSpace[counter - 1];
      if (valueLenInd > diff - 2) {
        extraCount++;

        const startInd = everyIndexBeforeSpace[counter] + 1;
        const excess = value.slice(diff - 1);

        wrapperSetWords(startInd, excess);
      }
    }
  }

  function ifKeyIsNotBackspace(): void {
    // Make sure any key pressed after a word without a space isn't included
    // To get the indexes of all letters before a space

    spaceBar = false;
    everyIndexBeforeSpace.splice(0);
    for (let i = 0; i < splittedArr.length; i++) {
      // This enables any additional letter to be added after the last letter in the screen
      if (i === splittedArr.length - 1) everyIndexBeforeSpace.push(i);

      if (splittedArr[i + 1] === " ") {
        everyIndexBeforeSpace.push(i);
      }
    }
    // Add the additional letters that are more than the length of the required word
    valueLen = value.length;
    valueLenInd = valueLen - 1;
    // To restrict the user from typing more than 25 letters for each word
    if (valueLenInd < 25) {
      globalCount++; // To keep tracks of letters;

      addMoreLetters();

      // End Test
      dispatch(setUserIn(value));

      dataToCheck.push(char);
      const id = dataToCheck.length - 1;
      const otherId = splittedArr[id];

      if (dataToCheck[id] === otherId) pastColor.push("green");
      else pastColor.push("red");

      setColor((prev) => {
        let newId;
        if (prev.id === undefined) newId = -1;
        else newId = prev.id;
        const reset = {
          id: newId + 1,
        };
        return reset;
      });
    }
  }

  function ifNormalKeysPressed(): void {
    // This needs to be here for some reason
    if (char === "") {
      backKeyPressed++;
      // To get how many letters to remove and the number of colors to pop off
      const num = userIn.length - value.length;
      // To make sure the colorId is in sync with the num
      setColor((prevId) => {
        return {
          id: prevId.id - num,
        };
      });
      dataToCheck.splice(dataToCheck.length - num);
      pastColor.splice(pastColor.length - num);
      globalCount -= num;
      const newCount = extraCount;

      // If Ctrl + backspace was pressed :
      if (num > 1) {
        let newState = "";
        const prevArr = wordsToDisplay.split(" ");
        let prevCount = 0;
        for (let i = 0; i <= spaceEnteredByUser; i++) {
          prevCount += prevArr[i].length;
          prevCount++;
        }
        prevCount--;
        // Check if num and prevCount are not equal because if there was
        // fullstop (.) they will be different
        if (extraCount === 0 || num === prevArr[spaceEnteredByUser].length) {
          extraCount = 0;

          const cpFirst = wordsToDisplay.slice(0, prevCount - newCount);

          const cpLast = wordsToDisplay.slice(prevCount);
          newState = cpFirst + cpLast;
        } else {
          // work with the difference from behind
          if (
            prevArr[spaceEnteredByUser].length - num >
            spaceSplit[spaceEnteredByUser].length
          ) {
            extraCount =
              prevArr[spaceEnteredByUser].length -
              num -
              spaceSplit[spaceEnteredByUser].length;
          } else extraCount = 0;

          let count = prevCount - num;
          const cpFirst = wordsToDisplay.slice(0, count);

          const cpLast = wordsToDisplay.slice(prevCount);
          newState = cpFirst + cpLast;
        }
        dispatch(setWordsToDisplay(newState));
      }
      // If only backspace was pressed :
      else {
        if (colorId.id > spaceSplit[spaceEnteredByUser].length - 1) {
          extraCount--;
          const startInd = globalCount;

          const cpFirst = wordsToDisplay.slice(0, startInd);
          const cpLast = wordsToDisplay.slice(startInd + 1);
          const newState = cpFirst + cpLast;
          dispatch(setWordsToDisplay(newState));
        }
      }
      dispatch(setUserIn(value));
      return;
    }

    ifKeyIsNotBackspace();
  }

  function showRedColor(): void {
    let gotten = false;
    const id = dataToCheck.length - 1;
    let newId: number = 0;

    for (let i = id + 1; i < splittedArr.length; i++) {
      if (!gotten) {
        globalCount++;
        dataToCheck.push(i);
        if (splittedArr[i] === " ") {
          pastColor.push("blue"); // If it is a space

          gotten = true;
          newId = i;
        } else {
          pastColor.push("red");
        }
      }
    }
    dataToCheck[newId] = " ";
  }

  function ifSpaceBarPressed(): void {
    spaceBar = true;
    // For the counter;
    counter++;
    spaceEnteredByUser++;
    extraCount = 0;

    setColor(() => {
      return {
        id: -1,
      };
    });

    /* If the word wasn't completed before pressing space bar, 
    complete the word with red color for the remaining letters.
    */
    showRedColor();

    dispatch(setUserIn(""));

    // If the user has submitted the last word by pressing space bar
    if (spaceEnteredByUser === totalSpaceInitially + 1) {
      dispatch(setWasDoneEarly(true));
      return;
    }
    // Make React re-render this component :
    setFake((prev) => !prev);
  }

  const previousSpaces = () => {
    let previousArray: string[][] = [[], []];

    // job is to return the previous word
    if (spaceEnteredByUser === spaceCountPrev) {
      previousArray[1] = [
        ...pastColor.slice(pastColor.lastIndexOf("blue") + 1),
      ];
      // console.log("in first", previousArray);
      return previousArray;
    } else {
      let pArray = [];
      for (let i = pastColor.length - 2; i >= 0; i--) {
        if (pastColor[i] === "blue") {
          break;
        }
        pArray.push(pastColor[i]);
      }
      pArray.reverse();
      previousArray[0] = pArray;
      spaceCountPrev = spaceEnteredByUser;
      // console.log("in second", previousArray);
      return previousArray;
    }
  };

  // To restart the app

  const handleRestart = () => {
    allCallbackIds.forEach((id) => clearInterval(id));

    dispatch(setWasDoneEarly(false));
    dispatch(setStartAnimating(false)); // For the timer animation
    dispatch(setUserIn(""));
    dispatch(setQueuedMode(null));
    dispatch(setHasGameStarted(false));
    dispatch(setIsOver(false));
    dispatch(setRestart(true));
    const id = setTimeout(() => dispatch(setRestart(false)), loadTime);
    dispatch(restartApp());
    dispatch(clearPreviousColor());
    setColor({} as TColor);
    clearAllEntries();
    allCallbackIds.push(id);
  };

  function checkCtrl(
    e: React.KeyboardEvent<HTMLInputElement> & KeyDownExtension
  ): void {
    if (e.key === "F5") {
      e.preventDefault();
      handleRestart();
      return;
    }

    if (e.key === "Backspace" && e.ctrlKey) isWrong = false;
    else if (e.key === "Delete" && e.ctrlKey) isWrong = false;
    else if (e.ctrlKey) isWrong = true;
    else isWrong = false;
  }

  // Main function handler
  const handleUserInput = (e: TInputEvent): void => {
    // Using union discrimination
    // input event
    if (e.type === "input") {
      const data = e.nativeEvent.data;

      // To prevent a user from typing while pressing the ctrl key
      // And to prevent whatever is typed from being process after the time is over
      if (!isWrong && !isOver && !restart && !showHighScore) {
        value = (e.target as HTMLInputElement).value;

        if (value.length > userIn.length) {
          char = data[data.length - 1];
        } else {
          // Backspace or Delete was pressed
          char = "";
        }

        if (char === " ") {
          // If space bar is pressed for the first time, nothing should happend
          // Also space bar should not follow space bar
          if (spaceBar) return;
        }

        if (!timeHasStarted) {
          dispatch(setStartAnimating(true));
          dispatch(setHasGameStarted(true));
        }
        timeHasStarted = true;

        if (spaceEnteredByUser < spaceSplit.length) {
          if (caretRef.current) {
            const { current } = caretRef;
            current.classList.remove("blink");
            const id = setTimeout(() => current.classList.add("blink"), 500);
            allCallbackIds.push(id);
          }

          if (char === " ") {
            ifSpaceBarPressed();
          } else {
            ifNormalKeysPressed();
          }

          dispatch(changePreviousColor(previousSpaces()));
        }
      }
    }
    // keydown event
    else {
      // on every keydown, check whether the ctrl key was held and take necessary actions
      if (!resultIsOpen && !restart && !isSubmitting && !showHighScore)
        checkCtrl(e);
    }
  };
  // end main function

  return (
    <>
      <section className="wordsDivContainer invisible">
        <Timer timeDelay={loadTime} finishedEarly={finishedEarly} />
        <WordsDiv
          spaceCount={spaceEnteredByUser}
          onInput={handleUserInput}
          handleRestart={handleRestart}
          caretRef={caretRef}
        />
      </section>
      <ToastContainer theme="dark" limit={2} />
    </>
  );
};

export default React.memo(WordsDivContainer);
