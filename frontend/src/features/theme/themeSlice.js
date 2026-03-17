import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light"
};

export const counterSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    enableDarkTheme: (state) => {
      state.theme = "dark";
    },
    enableLightTheme: (state) => {
      state.theme = "light";
    }
  }
});

export const { enableDarkTheme, enableLightTheme } = counterSlice.actions;

export default counterSlice.reducer;
