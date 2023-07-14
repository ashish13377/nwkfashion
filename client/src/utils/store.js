import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../utils/cartSlice";

const storedCart = localStorage.getItem("cart");
const initialState = {
  cart: {
    products: storedCart ? JSON.parse(storedCart) : [],
  },
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: initialState,
});
export default store;
