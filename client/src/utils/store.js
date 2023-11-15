import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../utils/cartSlice";
import wishlistReducer from "../utils/wishlistSlice";
import selectedDressReducer from "../utils/selectedDressSlice";
import discountReducer from "../utils/discountSlice";

const storedCart = localStorage.getItem("cart");
const storedWishlist = localStorage.getItem("wishlist");
const storedSelectedDress = localStorage.getItem("selectedDress");
const initialState = {
  cart: {
    products: storedCart ? JSON.parse(storedCart) : [],
  },
  wishlist: {
    wishlists: storedWishlist ? JSON.parse(storedWishlist) : [],
  },

  selectedDress: {
    selectedDressData: storedSelectedDress
      ? JSON.parse(storedSelectedDress)
      : [],
  },
  discount: 0, // Add the discount property to the initialState
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    selectedDress: selectedDressReducer,
    discount: discountReducer,
  },
  preloadedState: initialState,
});
export default store;
