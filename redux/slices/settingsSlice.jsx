"use client";

import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",

  initialState: {
    darkMode: "light",
  },
  reducers: {
    setTheme: (state) => {
      state.darkMode = state.darkMode === "light" ? "dark" : "light";
    },
  },
});

export const { setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
