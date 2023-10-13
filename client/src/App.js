import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SingleProductPage from "./pages/singleProductPage";
import LoginRegisterPage from "./pages/loginRegisterPage";
import MyAccountPage from "./pages/myAccountPage";
import ShopPage from "./pages/shopPage";
import CartPage from "./pages/cartPage";
import WishlistPage from "./pages/wishlistPage";
import CheckoutPage from "./pages/checkoutPage";
import AboutUs from "./pages/aboutUs";
import Faq from "./pages/faq";
import ReturnRefund from "./pages/returnRefund";
import Shipping from "./pages/shipping";
import NewCheckoutPage from "./pages/newCheckoutPage";
import Cancellation from "./pages/cancellation";
import Privacy from "./pages/privacy";
export const serverAPILocal = "https://myclassythreads.com/api";
// export const serverAPILocal = "http://localhost:5904/api";

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
          <Route path="/products/:productId" element={<SingleProductPage />} />
          <Route path="/wishlistPage" element={<WishlistPage />} />
          <Route path="/checkoutPage" element={<CheckoutPage />} />
          {/* <Route path="/newcheckoutPage" element={<NewCheckoutPage />} /> */}
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/return" element={<ReturnRefund />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/cancellation" element={<Cancellation />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
