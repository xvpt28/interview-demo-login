import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import noteSlice from "./slices/noteSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    notes: noteSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
