export interface AppContextInterface {
  startTime: number;
  isOver?: boolean;
  setIsOver?: React.Dispatch<React.SetStateAction<boolean>>;
}
