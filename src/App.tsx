import { useState } from "react";

import Header from "./Components/Header";
import Body from "./Components/Body";
import Footer from "./Components/Footer";

function App() {
  const [showOtherContainer, setShowOtherContainer] = useState(true);

  return (
    <>
      <Header toggleOtherContainer={setShowOtherContainer} />
      <Body show={showOtherContainer} />
      <Footer />
    </>
  );
}

export default App;
