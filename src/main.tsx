import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import { generateWords } from "./features/wordsSlice";
import "./style/index.scss";

// Get the initial words to display
store.dispatch(generateWords());

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </Provider>
);
