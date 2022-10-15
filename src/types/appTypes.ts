export interface ResultI {
  correctChars: number;
  wrongChars: number;
  totalCharTyped: number;
  wrongWords: number;
  correctWords: number;
  WPM: number;
  accuracy: number;
}

export interface AppI {
  startTime: number;
  hasGameStarted: boolean;
  isBlockCaret: boolean;
  shouldShowOtherContainer: boolean;
  showHighScore: boolean;
  showSettings: boolean;
  showOtherContainerIfItWasShown: boolean;
  highScore: ResultI;
  timeArray: number[];
}
