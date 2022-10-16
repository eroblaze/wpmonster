import { ResultI } from "./appTypes";

export type KeyDownExtension = {
  type: "keydown";
};

type TData = {
  data: string;
};

export type TNativeEvent = {
  type: "input";
  nativeEvent: TData;
};

export type TColor = {
  id: number;
};

export type TInputEvent =
  | (React.KeyboardEvent<HTMLInputElement> & KeyDownExtension)
  | (React.FormEvent<HTMLInputElement> & TNativeEvent);

export interface WordsI {
  wordsToDisplay: string;
  mode: string;
  previousColor: string[][];
  userIn: string;
  results: ResultI;
  isOver?: boolean;
  startAnimating?: boolean;
  restart?: boolean;
  resultIsOpen: boolean;
  displayPopUpResult: boolean;
  wasDoneEarly?: boolean;
  derivedWrongWords: string[] | null;
  queuedMode: string | null;

  //   onInput: (e: TInputEvent) => void;
  //   caretRef?: React.RefObject<HTMLSpanElement>;
}

export interface PreviousColorI {
  spaceEnteredByUser: number;
  spaceCountPrev: number;
  pastColor: string[];
}
