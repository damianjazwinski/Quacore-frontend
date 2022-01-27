import { configureStore } from "@reduxjs/toolkit";
import quacoreSlice from "./slice";

export const store = configureStore({
  reducer: {
    quacore: quacoreSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
