import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    userId: null,
    products: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const newProduct = { ...product, userId: state.userId };
      state.products.push(newProduct);

      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    removeFromCart: (state, action) => {
      const indexToRemove = action.payload;
      const userId = state.userId;

      // Filter out the product to be removed only if it belongs to the current user and has the intended index
      state.products = state.products.filter(
        (product, index) =>
          (product.userId === userId && index !== indexToRemove) ||
          product.userId !== userId
      );

      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    // ... other reducers
  },
});

export const { addToCart, removeFromCart, setUserId } = cartSlice.actions;

export default cartSlice.reducer;
