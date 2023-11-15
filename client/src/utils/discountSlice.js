import { createSlice } from "@reduxjs/toolkit";

const discountSlice = createSlice({
  name: "discount",
  initialState: 0,
  reducers: {
    setDiscount: (state, action) => action.payload,
    clearDiscount: () => 0,
  },
});

export const { setDiscount, clearDiscount } = discountSlice.actions;
export default discountSlice.reducer;
