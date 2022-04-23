import { useState, createContext } from "react";

import Type from "./Components/Type/Type";

import { AppContextInterface } from "./types/AppTypes";
import Header from "./Components/Header/Header";

import { ResultInterface } from "./types/TypeTypes";

export const wordsArrayRandom = [
  "one two",
  "mother ".repeat(400),
  "what is the reason for this it's to prepare for more features",
  "this project from learning react to working on this project and then almost giving up when things were not working as planned to learning typescript and tell me something girl are you tired tryna feel that void talk is cheap show me the code this is a very wise word once said by me then afterwards, i made it longer so I can have lots more stuffs to type in this world you come and you go i made up my mind to do the right thing and grind continously doing the right thing consistently what do you know? when the time comes you will testify of the goodness of God and you will surely share your testimony so don't be worried better days are ahead of you the tell me something girl are you tired tryna feel that void talk is cheap show me the code this is a very wise word once said by me then afterwards, i made it longer so I can have lots more stuffs to type in this world you come and you go i made up my mind to do the right thing and grind continously doing the right thing consistently what do you know? when the time comes you will testify of the goodness of God and you will surely share your testimony so don't be worried better days are ahead of you the tell me something girl are you tired tryna feel that void talk is cheap show me the code this is a very wise word once said by me then afterwards, i made it longer so I can have lots more stuffs to type in this world you come and you go i made up my mind to do the right thing and grind continously doing the right thing consistently",
];

const timeArray = [15, 30, 60];

export const AppCont = createContext<AppContextInterface>(
  {} as AppContextInterface
);

const App = () => {
  const [highScore, setHighScore] = useState<ResultInterface>(
    {} as ResultInterface
  );
  const [startTime, setStartTime] = useState(60);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isBlockCaret, setIsBlockCaret] = useState(false);
  const [shouldShowResultSection, setShouldShowResultSection] = useState(false);
  const [showSectionToggle, setShowSectionToggle] = useState(true);
  const [showHighScore, setShowHighScore] = useState(false);
  const wordsToDisplay = wordsArrayRandom[0];

  const handleTimeChange = (time: number) => {
    if (!hasGameStarted) setStartTime(time);
  };

  const handleCaretClick = (caret: boolean) => {
    if (!hasGameStarted && caret !== isBlockCaret) setIsBlockCaret(caret);
  };

  return (
    <>
      <AppCont.Provider
        value={{
          isBlockCaret,
          startTime,
          setHasGameStarted,
          shouldShowResultSection,
          setShouldShowResultSection,
          showSectionToggle,
          setShowSectionToggle,
          showHighScore,
          setShowHighScore,
          highScore,
          setHighScore,
        }}
      >
        <Header
          timeArray={timeArray}
          startTime={startTime}
          onTimeChange={handleTimeChange}
          onCaretClick={handleCaretClick}
        />
        <Type passedWords={wordsToDisplay} />
        {/* Footer component goes here */}
      </AppCont.Provider>
    </>
  );
};

export default App;
