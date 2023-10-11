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

      const existingProduct = state.wishlists.find((product) =>
        product.colors.find((color) =>
          productToAdd.colors.find(
            (productColor) => color._id === productColor._id
          )
        )
      );
      console.log("existing product:", existingProduct);

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

      localStorage.setItem("cart", JSON.stringify(state.wishlists));
    },

    removeFromWishlist: (state, action) => {
      const productIdToRemove = action.payload;
      const userId = state.userId;
      console.log("product to be removed", productIdToRemove);

      // Filter the state.wishlists array to remove the product with the matching productIdToRemove
      state.wishlists = state.wishlists.filter(
        (product) =>
          product.userId === userId &&
          product.colors.every((color) => color._id !== productIdToRemove)
      );

      console.log("state.selectedDressData", state.selectedDressData);

      localStorage.setItem("cart", JSON.stringify(state.wishlists));
    },

    increaseQuantiti: (state, action) => {
      const productId = action.payload;

      const product = state.wishlists.find((product) =>
        product.colors.find((color) => color._id === productId)
      );

      if (product) {
        product.quantiti++; // Increment the quantity
      }
    },

    decreaseQuantiti: (state, action) => {
      const productId = action.payload;
      const product = state.wishlists.find((product) =>
        product.colors.find((color) => color._id === productId)
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
