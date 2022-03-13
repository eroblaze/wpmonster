export default function generateWpm(
  rightTime: number = 1,
  pastColor: string[]
) {
  const wrongChars = pastColor.reduce((acc, el) => {
    if (el === "rgb(226, 5, 5)") acc++;
    return acc;
  }, 0);

  const spaceTyped = pastColor.reduce((acc, el) => {
    if (el === "blue") acc++;
    return acc;
  }, 0);

  const wrongCharsToWord = wrongChars / 5;

  let totalCharTyped = pastColor.reduce((acc, el) => {
    if (el === "#10f318" || el === "rgb(226, 5, 5)" || el === "blue") acc++;
    return acc;
  }, 0);

  const tot = totalCharTyped / 5;
  const GWM = tot / rightTime;
  const correctWords = (totalCharTyped - wrongChars) / 5;

  const WPM = Math.round(GWM - wrongCharsToWord);

  console.log(`Wrong Chars : ${wrongChars}`);
  console.log(`Spaces : ${spaceTyped}`);
  console.log(`Total char typed : ${totalCharTyped}`);
  console.log(`Wrong words : ${Math.round(wrongCharsToWord)}`);
  console.log(`Correct words : ${Math.round(correctWords)}`);
  console.log(`GWM : ${GWM}`);
  console.log(`NET WPM : ${WPM} wpm`);

  // For Accuracy

  let accuracy = ((totalCharTyped - wrongChars) / totalCharTyped) * 100;
  accuracy = +accuracy.toFixed(1);
  console.log(`accuracy : ${accuracy}%`);
}
