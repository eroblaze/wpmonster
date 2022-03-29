// Also, I just noticed that when you press space bar when you haven't completed a word, the characters that are turned to red, are also included in the calculation for total characters. Is that suppose to be so?
// Libraries
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  useCallback,
} from "react";
// Components
import Div from "../Div/WordsDiv";
import Input from "../Input/InputField";
import Timer from "../Timer/Timer";
import ResultModal from "../ResultModal/ResultModal";
import ResultSection from "../ResultSection/ResultSection";
// Helpers
import generateWpm from "../../Helpers/Generate_wpm";
import {
  KeyDownExtension,
  ResultInterface,
  TColor,
  TContext,
  TInputEvent,
} from "./TypeTypes";
import { AppCont, wordsArrayRandom } from "../../App";

// useful variables / bindings
let everyIndexBeforeSpace: number[] = [];
let dataToCheck: (number | string)[] = [];
let backKeyPressed = 0;
let splittedArr: string[] = [];
let pastColor: string[] = [];
let spaceSplit: string[] = [];
let counter = 0;
let space = 0;
let globalCount = 0;
let extraCount = 0;
// For the timer
let timeHasStarted = false;
const startTime = 100;
const loadTime = 2000;
// For the main function's context
let char: string;
let value: string;
let valueLen: number;
let valueLenInd: number;
let isWrong = false;
// When to show Result Section
let shouldShowResultSection = false;
let isSubmitting = false;

function clearAllEntries(): void {
  everyIndexBeforeSpace = [];
  dataToCheck = [];
  splittedArr = [];
  pastColor = [];
  spaceSplit = [];
  counter = 0;
  space = 0;
  globalCount = 0;
  extraCount = 0;
  timeHasStarted = false;
  char = "";
  value = "";
  valueLen = 0;
  valueLenInd = 0;
  isWrong = false;
}

interface TypeProps {
  passedWords: string;
}

export const TypeContext = createContext<TContext>({} as TContext);

function Type({ passedWords }: TypeProps) {
  const { isOver, setIsOver } = useContext(AppCont);

  // states
  const [wordsToDisplay, setWordsToDisplay] = useState(passedWords);

  const [userIn, setUserIn] = useState("");

  const [colorId, setColor] = useState<TColor>({} as TColor);

  const [startAnimating, setStartAnimating] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [results, setResults] = useState<ResultInterface | undefined>(
    undefined
  );
  const [highScore, setHighScore] = useState<ResultInterface>(
    {} as ResultInterface
  );
  const [fake, setFake] = useState(false);

  const [restart, setRestart] = useState(false);
  // end states

  const caretRef = useRef<HTMLSpanElement>(null);

  const resultsRef = useRef<number>(
    JSON.parse(localStorage.getItem("highScore") || JSON.stringify({ WPM: -1 }))
      .WPM
  );

  const onWindowKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && modalIsOpen) {
        setModalIsOpen(false);
      }
    },
    [modalIsOpen]
  );

  // start initialization
  useEffect(() => {
    // Listen for esc being pressed in the window
    console.log("called");
    window.addEventListener("keydown", onWindowKeyDown);

    return () => {
      window.removeEventListener("keydown", onWindowKeyDown);
    };
  }, [modalIsOpen]);

  // This is necessary inorder to set the highScore state to what was retrieved from the local storage
  useEffect(() => {
    const highScoreObj: ResultInterface = JSON.parse(
      localStorage.getItem("highScore") || JSON.stringify({})
    );
    setHighScore(highScoreObj);
  }, []);

  useEffect(() => {
    console.log(resultsRef.current);
    splittedArr = wordsToDisplay.split("");
  }, [wordsToDisplay]);

  useEffect(() => {
    spaceSplit = wordsToDisplay.split(" ");
    splittedArr = wordsToDisplay.split(""); // This is neccessary to re-create this array after every restart
  }, [restart]);

  useEffect(() => {
    if (isOver) {
      isSubmitting = true;
      setUserIn(""); // Clear the input field
      setTimeout(() => {
        isSubmitting = false;
        shouldShowResultSection = true;
        setModalIsOpen(true);
        // To generate the wpm
        setResults(generateWpm(1, pastColor));
      }, loadTime); // For the Modal Result
    }
  }, [isOver]);

  useEffect(() => {
    // To set an highscore
    if (results && results.WPM > resultsRef.current) {
      setHighScore(results);
      localStorage.setItem("highScore", JSON.stringify(results));
      resultsRef.current = results.WPM;
    }
  }, [results]);
  // end initialization

  function wrapperSetWords(startInd: number, excess: string): void {
    setWordsToDisplay((prev) => {
      const cpFirst = prev.slice(0, startInd);
      const cpLast = prev.slice(startInd);
      const newState = cpFirst + excess[excess.length - 1] + cpLast;
      return newState;
    });
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
      setUserIn(value);

      dataToCheck.push(char);
      const id = dataToCheck.length - 1;
      const otherId = splittedArr[id];

      if (dataToCheck[id] === otherId) pastColor.push("#10f318");
      else pastColor.push("rgb(226, 5, 5)");

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
    if (char === null) {
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
        setWordsToDisplay((prev) => {
          const prevArr = prev.split(" ");
          let prevCount = 0;
          for (let i = 0; i <= space; i++) {
            prevCount += prevArr[i].length;
            prevCount++;
          }
          prevCount--;
          // Check if num and prevCount are not equal because if there was
          // fullstop (.) they will be different
          if (extraCount === 0 || num === prevArr[space].length) {
            extraCount = 0;

            const cpFirst = prev.slice(0, prevCount - newCount);

            const cpLast = prev.slice(prevCount);
            const newState = cpFirst + cpLast;

            return newState;
          } else {
            // work with the difference from behind
            if (prevArr[space].length - num > spaceSplit[space].length) {
              extraCount =
                prevArr[space].length - num - spaceSplit[space].length;
            } else extraCount = 0;

            let count = prevCount - num;
            const cpFirst = prev.slice(0, count);

            const cpLast = prev.slice(prevCount);
            const newState = cpFirst + cpLast;

            return newState;
          }
        });
      }
      // If only backspace was pressed :
      else {
        if (colorId.id > spaceSplit[space].length - 1) {
          extraCount--;
          const startInd = globalCount;

          setWordsToDisplay((prev) => {
            const cpFirst = prev.slice(0, startInd);
            const cpLast = prev.slice(startInd + 1);
            const newState = cpFirst + cpLast;
            return newState;
          });
        }
      }
      setUserIn(value);
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
          pastColor.push("rgb(226, 5, 5)");
        }
      }
    }
    dataToCheck[newId] = " ";
  }

  function ifSpaceBarPressed(): void {
    // For the counter;
    counter++;
    space++;
    extraCount = 0;

    setColor((prevId) => {
      return {
        id: -1,
      };
    });

    /* If the word wasn't completed before pressing space bar, 
    complete the word with red color for the remaining letters.
    */
    showRedColor();

    setUserIn("");
    // Make React re-render this component :
    setFake((prev) => !prev);
  }

  // To restart the game

  const handleRestart = () => {
    setStartAnimating(false); // For the timer animation
    setUserIn("");
    setIsOver(false);
    setRestart(true);
    setTimeout(() => setRestart(false), loadTime);
    setWordsToDisplay(wordsArrayRandom[Math.round(Math.random())]); // Fetching is going to take place here
    setColor({} as TColor);
    clearAllEntries();
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
    // change event
    if (e.type === "change") {
      char = e.nativeEvent.data;
      // To prevent a user from typing while pressing the ctrl key
      // And to prevent whatever is typed from being process after the time is over
      if (!isWrong && !isOver && !restart) {
        value = e.target.value;

        if (!timeHasStarted) {
          setStartAnimating(true);
        }
        timeHasStarted = true;

        if (space < spaceSplit.length) {
          if (caretRef.current) {
            const { current } = caretRef;
            current.classList.remove("blink");
            setTimeout(() => current.classList.add("blink"), 500);
          }

          if (char === " ") {
            ifSpaceBarPressed();
          } else {
            ifNormalKeysPressed();
          }
        }
      }
    }
    // keydown event
    else {
      // on every keydown, check whether the ctrl key was held and take necessary actions
      if (!modalIsOpen && !restart && !isSubmitting) checkCtrl(e);
    }
  };
  // end main function

  return (
    <>
      <TypeContext.Provider
        value={{
          words: wordsToDisplay,
          pastColor,
          userIn,
          onInput: handleUserInput,
          results,
          modalIsOpen: modalIsOpen,
          highScore: highScore,
          restart,
          startAnimating,
          caretRef,
        }}
      >
        <section className="main-body">
          {modalIsOpen && (
            <ResultModal
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
            />
          )}
          <div className="typing-box-1">
            <Timer
              timeDelay={loadTime}
              startTime={startTime}
              startAnimating={startAnimating}
            />
            <div className="main-typing-box">
              <Div spaceCount={space} />
              <Input click={handleRestart} />
            </div>
          </div>

          {shouldShowResultSection && (
            <div className="typing-box-2">
              <ResultSection />
            </div>
          )}
        </section>
      </TypeContext.Provider>
    </>
  );
}

export default Type;
