"use client";
import { configureStore } from "@reduxjs/toolkit";
import atinaReducer from "../slices/atinaSlice";
import settingsReducer from "../slices/settingsSlice";

const store = configureStore({
  reducer: {
    atina: atinaReducer,
    settings: settingsReducer,
  },
});

export default store;
