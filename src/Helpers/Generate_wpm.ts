export default function generateWpm(rightTime: number, pastColor: string[]) {
  console.log(`before change rightTime :${rightTime}`);
  // Format the rightTime (from seconds to minutes)
  rightTime = rightTime / 60;

  console.log(`rightTime changed: ${rightTime}`);

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

  let totalCharTyped = pastColor.reduce((acc, el) => {
    if (el === "green" || el === "red" || el === "blue") acc++;
    return acc;
  }, 0);

  const tot = totalCharTyped / 5;
  const GWM = tot / rightTime;
  const correctWords = Math.round((totalCharTyped - wrongChars) / 5);

  const WPM = Math.round(GWM - wrongCharsToWord);
  const correctChars = totalCharTyped - wrongChars;

  // console.log(`Correct Chars : ${correctChars}`);
  // console.log(`Wrong Chars : ${wrongChars}`);
  // console.log(`Spaces : ${spaceTyped}`);
  // console.log(`Total char typed : ${totalCharTyped}`);
  // console.log(`Wrong words : ${wrongCharsToWord}`);
  // console.log(`Correct words : ${correctWords}`);
  // console.log(`GWM : ${GWM}`);
  // console.log(`NET WPM : ${WPM} wpm`);

  // For Accuracy

  let accuracy = ((totalCharTyped - wrongChars) / totalCharTyped) * 100;
  accuracy = +accuracy.toFixed(1) || 0; // Incase of when it is 0
  // console.log(`accuracy : ${accuracy}%`);

  // console.log(`rightTime : ${rightTime}`);
  // console.log(
  //   `Normally it would have been if it were to be 1 minute ${
  //     Math.round(totalCharTyped / 5) - wrongCharsToWord
  //   } wpm`
  // );

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
