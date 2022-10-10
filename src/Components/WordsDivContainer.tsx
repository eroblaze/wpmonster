import Timer from "./Timer";
import WordsDiv from "./WordsDiv";

const WordsDivContainer = () => {
  return (
    <section className="wordsDivContainer invisible">
      <Timer />
      <WordsDiv />
    </section>
  );
};

export default WordsDivContainer;
