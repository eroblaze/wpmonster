export interface AppContextInterface {
  startTime: number;
  setHasGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  isBlockCaret: boolean;
}
