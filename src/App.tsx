import React, { useState, createContext } from "react";

import Type from "./Components/Type/Type";

import { AppContextInterface } from "../src/AppTypes";

export const wordsArrayRandom = [
  `this project from learning react to working on this project and then almost giving up when things were not working as planned to learning typescript and a whole lot of other stuff to react-router and redux and now fixing a major bug in this app and now I'm just going to add more things to this project and keep on adding until i release it sometime this month by the grace of God and then open source it so watch this space for me`,
  "when the time comes you will testify of the goodness of God and you will surely share your testimony so don't be worried better days are ahead of you the most important thing about programming and perhaps the beauty of programming is being able to sit at the comfort of your living room and make things this was what a popular programmer once said it's so true and i was stucked in the trap of thinking that I have to master the syntax of a language",
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
        <div className="app">
          <Type passedWords={wordsToDisplay} />
        </div>
      </AppCont.Provider>
    </>
  );
};

export default App;
