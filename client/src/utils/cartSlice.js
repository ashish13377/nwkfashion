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
      product.userId = state.userId;
      state.products.push(product);
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product._id !== productId
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
