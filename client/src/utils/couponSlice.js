import { createSlice } from "@reduxjs/toolkit";

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    code: "", // Initial state for the coupon code
  },
  reducers: {
    setCouponCode: (state, action) => {
      state.code = action.payload;
    },
    clearCouponCode: (state) => {
      state.code = "";
    },
  },
});

export const { setCouponCode, clearCouponCode } = couponSlice.actions;
export default couponSlice.reducer;
