import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../utils/cartSlice";

const rootReducer = {
  cart: cartReducer,
  // Add other reducers here if needed
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
