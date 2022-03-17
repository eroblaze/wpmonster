export type KeyDownExtension = {
  type: "keydown";
};

type TData = {
  data: string;
};

export type TNativeEvent = {
  type: "change";
  nativeEvent: TData;
};

export type TColor = {
  id: number;
};

export type TInputEvent =
  | (React.KeyboardEvent<HTMLInputElement> & KeyDownExtension)
  | (React.ChangeEvent<HTMLInputElement> & TNativeEvent);
export interface ResultInterface {
  correctChars: number;
  wrongChars: number;
  totalCharTyped: number;
  wrongWords: number;
  correctWords: number;
  WPM: number;
  accuracy: number;
}

export type TContext = {
  words: string;
  pastColor: string[];
  userIn: string;
  onInput: (e: TInputEvent) => void;
  time: number | string;
  results?: ResultInterface | null;
  modalIsOpen?: boolean;
};
