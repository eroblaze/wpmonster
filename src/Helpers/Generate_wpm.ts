export default function generateWpm(time: number, pastColor: string[]) {
  const wordsArr = pastColor.join("").split("blue");

  let wrongWordsIdx = wordsArr.map((el, idx) => {
    if (el.includes("red")) return idx;
    return -1; // just to fill the ones that don't have red
  });

  wrongWordsIdx = wrongWordsIdx.filter((el) => el >= 0); // remove all the -1

  const wrongChars = pastColor.reduce((acc, el) => {
    if (el === "red") acc++;
    return acc;
  }, 0);

  const wrongCharsToWord = Math.round(wrongChars / 5);

  let totalCharTyped = pastColor.length;

  const correctChars = totalCharTyped - wrongChars;

  const correctWords = Math.round(correctChars / 5);

  let WPM = Math.round((correctChars * (60 / time)) / 5); // Gotten from monkeytype
  if (WPM < 0 || isNaN(WPM)) WPM = 0;

  // For Accuracy
  let accuracy = (correctChars / totalCharTyped) * 100;
  accuracy = +accuracy.toFixed(1) || 0; // Incase of when it is 0

  return {
    wrongWordsIdx,
    correctChars,
    wrongChars,
    totalCharTyped,
    wrongWords: wrongCharsToWord,
    correctWords,
    WPM,
    accuracy,
  };
}
