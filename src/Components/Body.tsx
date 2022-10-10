import WordsDivContainer from "./WordsDivContainer";
import OtherContainer from "./OtherContainer";

const Body = ({ show }: { show: boolean }) => {
  return (
    <main className="container onlyWords">
      <WordsDivContainer />
      {show && <OtherContainer />}
    </main>
  );
};

export default Body;
