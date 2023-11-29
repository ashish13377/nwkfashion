import { createSlice } from "@reduxjs/toolkit";

const discountSlice = createSlice({
  name: "discount",
  initialState: 0,
  reducers: {
    setDiscount: (state, action) => action.payload,
    clearDiscount: () => 0,
    calculateDiscount: (state, action) => action.payload,
    applyCoupon: (state, action) => {
      const { couponCode, subtotal } = action.payload;

      if (couponCode === "EXAMPLECODE10") {
        // Apply a 10% discount
        const discountValue = subtotal * 0.1;
        return discountValue;
      } else if (couponCode === "EXAMPLECODE20") {
        // Apply a 20% discount
        const discountValue = subtotal * 0.2;
        return discountValue;
      } else {
        // Clear the discount if the coupon is not valid
        return 0;
      }
    },
  },
});

export const { setDiscount, clearDiscount, calculateDiscount, applyCoupon } =
  discountSlice.actions;
export default discountSlice.reducer;
