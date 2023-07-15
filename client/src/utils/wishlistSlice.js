import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlists: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      state.wishlists.push(product);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlists));
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.wishlists = state.wishlists.filter(
        (product) => product._id !== productId
      );
      localStorage.setItem("wishlist", JSON.stringify(state.wishlists));
    },
    // ... other reducers
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
