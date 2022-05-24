import { ResultInterface } from "./TypeTypes";

export type Mode = "common" | "complex";
export interface AppContextInterface {
  startTime: number;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  hasGameStarted: boolean;
  setHasGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  isBlockCaret: boolean;
  shouldShowResultSection: boolean;
  setShouldShowResultSection: React.Dispatch<React.SetStateAction<boolean>>;
  showSectionToggle: boolean;
  setShowSectionToggle: React.Dispatch<React.SetStateAction<boolean>>;
  showHighScore: boolean;
  setShowHighScore: React.Dispatch<React.SetStateAction<boolean>>;
  highScore: ResultInterface;
  setHighScore: React.Dispatch<React.SetStateAction<ResultInterface>>;
  timeArray: number[];
  onTimeChange: (e: number) => void;
  onCaretClick: (isBlockCaret: boolean) => void;
}
