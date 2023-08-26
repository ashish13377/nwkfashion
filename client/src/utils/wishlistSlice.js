import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    userId: null,
    wishlists: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const productToAdd = action.payload;
      const existingProduct = state.wishlists.find(
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
        state.wishlists.push(newProduct);
      }

      localStorage.setItem("wishlist", JSON.stringify(state.wishlists));
    },

    removeFromWishlist: (state, action) => {
      const productIdToRemove = action.payload; // Assuming action.payload is the product ID (_id)
      const userId = state.userId;

      // Filter out the product to be removed only if it belongs to the current user and has the intended product ID
      state.wishlists = state.wishlists.filter(
        (product) =>
          (product.userId === userId && product._id !== productIdToRemove) ||
          product.userId !== userId
      );

      localStorage.setItem("wishlist", JSON.stringify(state.wishlists));
    },

    increaseQuantiti: (state, action) => {
      const productId = action.payload;
      const product = state.wishlists.find(
        (product) => product._id === productId
      );
      if (product) {
        product.quantiti++; // Increment the quantity
      }
    },

    decreaseQuantiti: (state, action) => {
      const productId = action.payload;
      const product = state.wishlists.find(
        (product) => product._id === productId
      );
      if (product && product.quantiti > 1) {
        product.quantiti--; // Decrement the quantity, ensuring it doesn't go below 1
      }
    },
    setWishlistUserId: (state, action) => {
      state.userId = action.payload;
    },
    // ... other reducers
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  setWishlistUserId,
  increaseQuantiti,
  decreaseQuantiti,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
