import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SingleProductPage from "./pages/singleProductPage";
import LoginRegisterPage from "./pages/loginRegisterPage";
import MyAccountPage from "./pages/myAccountPage";
import ShopPage from "./pages/shopPage";

export const serverAPILocal = "http://localhost:5904/api";

function App() {
  return (
    <div className="main-wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/singleProductPage" element={<SingleProductPage />} />
          <Route path="/loginRegisterPage" element={<LoginRegisterPage />} />
          <Route path="/myAccountPage" element={<MyAccountPage />} />
          <Route path="/:category" element={<ShopPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
