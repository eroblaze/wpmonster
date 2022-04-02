export interface AppContextInterface {
  startTime: number;
  setHasGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  isOver?: boolean;
  setIsOver?: React.Dispatch<React.SetStateAction<boolean>>;
}
