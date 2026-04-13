import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
	  themeReducer: themeReducer,
    cartReducer: cartReducer,
    authReducer: authReducer
  }
});