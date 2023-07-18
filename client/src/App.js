import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SingleProductPage from "./pages/singleProductPage";
import LoginRegisterPage from "./pages/loginRegisterPage";
import MyAccountPage from "./pages/myAccountPage";
import ShopPage from "./pages/shopPage";
import CartPage from "./pages/cartPage";
import WishlistPage from "./pages/wishlistPage";
import CheckoutPage from "./pages/checkoutPage";
export const serverAPILocal = "http://localhost:5904/api";

function App() {
  return (
    <div className="main-wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginRegisterPage" element={<LoginRegisterPage />} />
          <Route path="/myAccountPage" element={<MyAccountPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/:category" element={<ShopPage />} />{" "}
          <Route path="/:category/:productId" element={<SingleProductPage />} />
          <Route path="/wishlistPage" element={<WishlistPage />} />
          <Route path="/checkoutPage" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
