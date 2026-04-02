import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light"
};

export const themeSlice = createSlice({
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

export const { enableDarkTheme, enableLightTheme } = themeSlice.actions;

export default themeSlice.reducer;
