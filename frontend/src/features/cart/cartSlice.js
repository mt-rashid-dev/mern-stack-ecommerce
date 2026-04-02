import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  total: 0
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const discountedPrice = action.payload.price * (1 - action.payload.discount / 100);
      const newItem = { ...action.payload, quantity: 1, discountedPrice };
      console.log(newItem);
      state.cart.push(newItem);
      state.total += discountedPrice;
      console.log(state.cart);
    },
    increment: (state) => {
      // write code here
    },
    decrement: (state) => {
      // write code here
    },
    clearCart: (state) => {
      // write code here
    }
  }
});

export const { addToCart, increment, decrement, clearCart } = cartSlice.actions;

export default cartSlice.reducer;