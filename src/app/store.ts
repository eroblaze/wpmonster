import { configureStore } from "@reduxjs/toolkit";
import app from "../features/appSlice";
import wordsSlice from "../features/wordsSlice";

const store = configureStore({
  reducer: {
    app,
    words: wordsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
