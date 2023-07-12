import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    // Add other cart-related actions as needed
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
