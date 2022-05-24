import { useState, createContext, useEffect, useRef } from "react";
import { gsap } from "gsap";

import Type from "./Components/Type/Type";
import Header from "./Components/Header/Header";

import { AppContextInterface, Mode } from "./types/AppTypes";
import { ResultInterface } from "./types/TypeTypes";

import Data from "../src/Data/common/words.json";
import ComplexData from "../src/Data/complex/complex.json";

function formatWords(data: string[] = Data) {
  const newData = data.sort(() => Math.random() - 0.5);
  const wordString = newData.join(" ");
  return wordString;
}

// export const wordsArrayRandom = [
//   // "one two",
//   "mother ".repeat(400),
//   // "what is the reason for this it's to prepare for more features",
//   "this project from learning react to working on this project and then almost giving up when things were not working as planned to learning typescript and tell me something girl are you tired tryna feel that void talk is cheap show me the code this is a very wise word once said by me then afterwards, i made it longer so I can have lots more stuffs to type in this world you come and you go i made up my mind to do the right thing and grind continously doing the right thing consistently what do you know? when the time comes you will testify of the goodness of God and you will surely share your testimony so don't be worried better days are ahead of you the tell me something girl are you tired tryna feel that void talk is cheap show me the code this is a very wise word once said by me then afterwards, i made it longer so I can have lots more stuffs to type in this world you come and you go i made up my mind to do the right thing and grind continously doing the right thing consistently what do you know? when the time comes you will testify of the goodness of God and you will surely share your testimony so don't be worried better days are ahead of you the tell me something girl are you tired tryna feel that void talk is cheap show me the code this is a very wise word once said by me then afterwards, i made it longer so I can have lots more stuffs to type in this world you come and you go i made up my mind to do the right thing and grind continously doing the right thing consistently",
// ];

const timeArray = [15, 30, 60];

export const AppCont = createContext<AppContextInterface>(
  {} as AppContextInterface
);

function App() {
  const [highScore, setHighScore] = useState<ResultInterface>(
    {} as ResultInterface
  );
  const [startTime, setStartTime] = useState(60);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isBlockCaret, setIsBlockCaret] = useState(false);
  const [shouldShowResultSection, setShouldShowResultSection] = useState(false);
  const [showSectionToggle, setShowSectionToggle] = useState(true);
  const [showHighScore, setShowHighScore] = useState(false);
  const [mode, setMode] = useState<Mode>("common");
  const appWords = formatWords();
  const tl = useRef<GSAPTimeline>();

  useEffect(() => {
    // on page load animation :)
    tl.current = gsap
      .timeline()
      .from(".site-title", {
        duration: 0.5,
        stagger: 0.2,
        scale: -1,
        autoAlpha: 0,
      })
      .addLabel("fade-in")
      .from(
        [".menu-logo", "#crown"],
        {
          duration: 1,
          autoAlpha: 0,
        },
        "fade-in"
      )
      .from(
        ".typing-box-1",
        {
          duration: 1,
          y: -10,
          autoAlpha: 0,
          onStart: () => {
            // Give the main input field its focus back
            const input = document.querySelector(
              "#main-input-type"
            ) as HTMLInputElement;
            input.focus();
          },
        },
        "fade-in"
      );

    return () => {
      if (tl.current) tl.current.kill(); // kill all animations on unmount
    };
  }, []);

  const handleTimeChange = (time: number) => {
    if (!hasGameStarted) setStartTime(time);
  };

  const handleCaretClick = (caret: boolean) => {
    if (!hasGameStarted && caret !== isBlockCaret) setIsBlockCaret(caret);
  };

  const handleWordsRestart = (mode: string) => {
    let fetchedWords = "";
    if (mode === "common") {
      fetchedWords = formatWords();
    } else if (mode === "complex") {
      fetchedWords = formatWords(ComplexData);
    }
    return fetchedWords;
  };

  return (
    <>
      <AppCont.Provider
        value={{
          mode,
          setMode,
          isBlockCaret,
          startTime,
          hasGameStarted,
          setHasGameStarted,
          shouldShowResultSection,
          setShouldShowResultSection,
          showSectionToggle,
          setShowSectionToggle,
          showHighScore,
          setShowHighScore,
          highScore,
          setHighScore,
          timeArray,
          onTimeChange: handleTimeChange,
          onCaretClick: handleCaretClick,
        }}
      >
        <Header />
        <Type passedWords={appWords} onAppRestart={handleWordsRestart} />
      </AppCont.Provider>
    </>
  );
}

export default App;
