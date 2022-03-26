import React, { useState, createContext } from "react";

import Type from "./Components/Type/Type";

import { AppContextInterface } from "../src/AppTypes";
import Header from "./Components/Header/Header";

export const wordsArrayRandom = [
  `this project from learning react to working on this project and then almost giving up when things were not working as planned to learning typescript and tell me something girl are you tired tryna feel that void`,
  "when the time comes you will testify of the goodness of God and you will surely share your testimony so don't be worried better days are ahead of you the tell me something girl are you tired tryna feel that void",
];

export const AppCont = createContext<AppContextInterface>(
  {} as AppContextInterface
);

const App = () => {
  const [isOver, setIsOver] = useState(false);
  const wordsToDisplay = wordsArrayRandom[0];

  return (
    <>
      <AppCont.Provider value={{ isOver, setIsOver }}>
        <Header />
        <Type passedWords={wordsToDisplay} />
        {/* Footer component goes here */}
      </AppCont.Provider>
    </>
  );
};

export default App;
