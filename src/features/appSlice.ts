import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { AppI, ResultI } from "../types/appTypes";

const initialState = {
  startTime: 30,
  hasGameStarted: false,
  highScore: {
    accuracy: 0,
    correctChars: 0,
    correctWords: 0,
    totalCharTyped: 0,
    WPM: 0,
    wrongChars: 0,
    wrongWords: 0,
  },
  isBlockCaret: false,
  shouldShowOtherContainer: false,
  showOtherContainerIfItWasShown: true,
  timeArray: [15, 30, 60],
} as AppI;

const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    setShouldShowOtherContainer: (state, action: PayloadAction<boolean>) => {
      state.shouldShowOtherContainer = action.payload;
    },

    setShowOtherContainerIfItWasShown: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.showOtherContainerIfItWasShown = action.payload;
    },
    setHasGameStarted: (state, action: PayloadAction<boolean>) => {
      state.hasGameStarted = action.payload;
    },
    setIsBlockCaret: (state, action: PayloadAction<boolean>) => {
      state.isBlockCaret = action.payload;
    },
    setShowHighScore: (state, action: PayloadAction<boolean>) => {
      state.showHighScore = action.payload;
    },
    setShowSettings: (state, action: PayloadAction<boolean>) => {
      state.showSettings = action.payload;
    },
    changeTime: (state, action: PayloadAction<number>) => {
      state.startTime = action.payload;
    },
    setHighScore: (state, action: PayloadAction<ResultI>) => {
      state.highScore = action.payload;
    },
    setStartTime: (state, action: PayloadAction<number>) => {
      state.startTime = action.payload;
    },
  },
});

export const {
  setShouldShowOtherContainer,
  setShowOtherContainerIfItWasShown,
  changeTime,
  setHighScore,
  setIsBlockCaret,
  setHasGameStarted,
  setShowHighScore,
  setShowSettings,
  setStartTime,
} = app.actions;

export const selectAppState = (state: RootState) => state.app;
export const optimizedSelectAppState = createSelector(
  selectAppState,
  (app: AppI) => app
);

export default app.reducer;
