import WordsDivContainer from "./WordsDivContainer";
import OtherContainer from "./OtherContainer";
import Result from "./Result";

import { useAppSelector } from "../app/hooks";
import { optimizedSelectAppState } from "../features/appSlice";
import { optimizedSelectWordsState } from "../features/wordsSlice";

const Body = () => {
  const { shouldShowOtherContainer } = useAppSelector(optimizedSelectAppState);
  const { displayPopUpResult } = useAppSelector(optimizedSelectWordsState);

  return (
    <main className="container">
      {displayPopUpResult && <Result popUp={true} />}
      <WordsDivContainer />
      {shouldShowOtherContainer && <OtherContainer />}
    </main>
  );
};

export default Body;
