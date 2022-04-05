export interface AppContextInterface {
  startTime: number;
  setHasGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  isBlockCaret: boolean;
  shouldShowResultSection: boolean;
  setShouldShowResultSection: React.Dispatch<React.SetStateAction<boolean>>;
  showSectionToggle: boolean;
  setShowSectionToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
