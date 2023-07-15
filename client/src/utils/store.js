import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../utils/cartSlice";
import wishlistReducer from "../utils/wishlistSlice";

const storedCart = localStorage.getItem("cart");
const storedWishlist = localStorage.getItem("wishlist");
const initialState = {
  cart: {
    products: storedCart ? JSON.parse(storedCart) : [],
  },
  wishlist: {
    wishlists: storedWishlist ? JSON.parse(storedWishlist) : [],
  },
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  preloadedState: initialState,
});
export default store;
