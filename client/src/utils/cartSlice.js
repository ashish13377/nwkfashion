import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    userId: null,
    products: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload;
      const existingProduct = state.products.find(
        (product) => product._id === productToAdd._id
      );

      if (existingProduct) {
        // If the product is already in the cart, increase its quantity
        existingProduct.quantiti += 1;
      } else {
        // If the product is not in the cart, add it with quantity 1
        const newProduct = {
          ...productToAdd,
          userId: state.userId,
          quantiti: 1,
        };
        state.products.push(newProduct);
      }

      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload; // Assuming action.payload is the product ID (_id)
      const userId = state.userId;

      // Filter out the product to be removed only if it belongs to the current user and has the intended product ID
      state.products = state.products.filter(
        (product) =>
          (product.userId === userId && product._id !== productIdToRemove) ||
          product.userId !== userId
      );

      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    increaseQuantiti: (state, action) => {
      const productId = action.payload;
      const product = state.products.find(
        (product) => product._id === productId
      );
      if (product) {
        product.quantiti++; // Increment the quantity
      }
    },

    decreaseQuantiti: (state, action) => {
      const productId = action.payload;
      const product = state.products.find(
        (product) => product._id === productId
      );
      if (product && product.quantiti > 1) {
        product.quantiti--; // Decrement the quantity, ensuring it doesn't go below 1
      }
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    // ... other reducers
  },
});

export const {
  addToCart,
  removeFromCart,
  setUserId,
  increaseQuantiti,
  decreaseQuantiti,
} = cartSlice.actions;

export default cartSlice.reducer;
