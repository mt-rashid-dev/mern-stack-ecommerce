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
    },
    increment: (state, action) => {
      const product = state.cart.find((item) => item._id === action.payload);
      product.quantity += 1;
      state.total += product.discountedPrice;
    },
    decrement: (state, action) => {
      const product = state.cart.find((item) => item._id === action.payload);
      product.quantity -= 1;
      state.total -= product.discountedPrice;
      if (product.quantity === 0) {
        state.cart = state.cart.filter((item) => item._id !== action.payload);
      }
    },
    clearCart: (state) => {
      // write code here
    }
  }
});

export const { addToCart, increment, decrement, clearCart } = cartSlice.actions;

export default cartSlice.reducer;