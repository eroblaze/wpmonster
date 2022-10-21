import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { ResultI } from "../types/appTypes";
import { WordsI } from "../types/wordsTypes";

import Data from "../Data/common/words.json";
import Data2 from "../Data/common/words2.json";
import ComplexData from "../Data/complex/complex.json";
import { RootState } from "../app/store";

function formatWords(data: string[] = Data2) {
  const newData = data.sort(() => Math.random() - 0.5);
  const wordString = newData.join(" ");
  return wordString;
}

const initialState = {
  wordsToDisplay: "",
  userIn: "",
  mode: "common",
  queuedMode: null,
  previousColor: [],
  results: {
    accuracy: 0,
    correctChars: 0,
    correctWords: 0,
    totalCharTyped: 0,
    WPM: 0,
    wrongChars: 0,
    wrongWords: 0,
  },
  isOver: false,
  startAnimating: false,
  restart: false,
  resultIsOpen: false,
  displayPopUpResult: false,
  wasDoneEarly: false,
  derivedWrongWords: null,
} as WordsI;

const wordsSlice = createSlice({
  name: "wordsSlice",
  initialState,
  reducers: {
    generateWords: (state) => {
      if (state.mode === "complex") {
        state.wordsToDisplay = formatWords(ComplexData);
      } else {
        state.wordsToDisplay = formatWords();
      }
    },
    restartApp: (state) => {
      const { mode } = state;
      let fetchedWords = "";
      if (mode === "common") {
        fetchedWords = formatWords();
      } else if (mode === "complex") {
        fetchedWords = formatWords(ComplexData);
      }
      state.wordsToDisplay = fetchedWords;
    },

    setWordsToDisplay: (state, action: PayloadAction<string>) => {
      state.wordsToDisplay = action.payload;
    },

    changePreviousColor: (state, action: PayloadAction<string[][]>) => {
      state.previousColor = action.payload;
    },
    clearPreviousColor: (state) => {
      state.previousColor = [];
    },
    setUserIn: (state, action: PayloadAction<string>) => {
      state.userIn = action.payload;
    },
    setResults: (state, action: PayloadAction<ResultI>) => {
      state.results = action.payload;
    },
    setIsOver: (state, action: PayloadAction<boolean>) => {
      state.isOver = action.payload;
    },
    setRestart: (state, action: PayloadAction<boolean>) => {
      state.restart = action.payload;
    },
    setStartAnimating: (state, action: PayloadAction<boolean>) => {
      state.startAnimating = action.payload;
    },
    setResultIsOpen: (state, action: PayloadAction<boolean>) => {
      state.resultIsOpen = action.payload;
    },
    setDisplayPopUpResult: (state, action: PayloadAction<boolean>) => {
      state.displayPopUpResult = action.payload;
    },
    setDerivedWrongWords: (state, action: PayloadAction<string[] | null>) => {
      state.derivedWrongWords = action.payload;
    },
    setWasDoneEarly: (state, action: PayloadAction<boolean>) => {
      state.wasDoneEarly = action.payload;
    },
    changeMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload;
    },
    setQueuedMode: (state, action: PayloadAction<string | null>) => {
      state.queuedMode = action.payload;
    },
  },
});

export const {
  changePreviousColor,
  setDerivedWrongWords,
  setIsOver,
  setRestart,
  setResultIsOpen,
  setDisplayPopUpResult,
  setResults,
  setStartAnimating,
  setUserIn,
  setWordsToDisplay,
  setWasDoneEarly,
  changeMode,
  generateWords,
  restartApp,
  clearPreviousColor,
  setQueuedMode,
} = wordsSlice.actions;

export const selectWordsState = (state: RootState) => state.words;
export const optimizedSelectWordsState = createSelector(
  selectWordsState,
  (words: WordsI) => words
);

export default wordsSlice.reducer;
