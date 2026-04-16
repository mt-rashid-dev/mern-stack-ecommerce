import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profilePicture: "",
  firstName: "",
  lastName: "",
  email: "",
  role: ""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
    storeFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    storeLastName: (state, action) => {
      state.lastName = action.payload;
    },
    storeEmail: (state, action) => {
      state.email = action.payload;
    },
    storeRole: (state, action) => {
      state.role = action.payload;
    },
    signout: (state) => {
      state.profilePicture = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.role = "";
    }
  }
});

export const { storeProfilePicture, storeFirstName, storeLastName, storeEmail, storeRole, signout } = authSlice.actions;

export default authSlice.reducer;