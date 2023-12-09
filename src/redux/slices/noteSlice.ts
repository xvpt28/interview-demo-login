import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "Note",
  initialState: {
    notes: [],
  },
  reducers: {
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },
  },
});

export const { setNotes } = noteSlice.actions;
export default noteSlice.reducer;
