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
      console.log("product to add", productToAdd);

      const existingProduct = state.products.find((product) =>
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
        state.products.push(newProduct);
      }

      localStorage.setItem("cart", JSON.stringify(state.products));
    },

    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      const userId = state.userId;
      console.log("product to be removed", productIdToRemove);

      // Filter the state.products array to remove the product with the matching productIdToRemove
      state.products = state.products.filter(
        (product) =>
          product.userId === userId &&
          product.colors.every((color) => color._id !== productIdToRemove)
      );

      console.log("state.selectedDressData", state.selectedDressData);

      localStorage.setItem("cart", JSON.stringify(state.products));
    },

    increaseQuantiti: (state, action) => {
      const productId = action.payload;

      const product = state.products.find((product) =>
        product.colors.find((color) => color._id === productId)
      );

      if (product) {
        product.quantiti++; // Increment the quantity
      }
    },

    decreaseQuantiti: (state, action) => {
      const productId = action.payload;
      const product = state.products.find((product) =>
        product.colors.find((color) => color._id === productId)
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
