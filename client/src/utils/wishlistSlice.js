import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    userId: null,
    wishlists: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const newProduct = { ...product, userId: state.userId };
      state.wishlists.push(newProduct);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlists));
    },
    removeFromWishlist: (state, action) => {
      const indexToRemove = action.payload;
      const userId = state.userId;

      state.wishlists = state.wishlists.filter(
        (product, index) =>
          (product.userId === userId && index !== indexToRemove) ||
          product.userId !== userId
      );
      localStorage.setItem("wishlist", JSON.stringify(state.wishlists));
    },

    setWishlistUserId: (state, action) => {
      state.userId = action.payload;
    },
    // ... other reducers
  },
});

export const { addToWishlist, removeFromWishlist, setWishlistUserId } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
