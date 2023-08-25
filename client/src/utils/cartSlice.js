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
      const index = action.payload; // Index of the product to be removed
      state.products.splice(index, 1); // Remove the product at the given index
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
