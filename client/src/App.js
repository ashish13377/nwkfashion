import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SingleProductPage from "./pages/singleProductPage";
import LoginRegisterPage from "./pages/loginRegisterPage";
function App() {
  return (
    <div className="main-wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/singleProductPage" element={<SingleProductPage />} />
          <Route path="/loginRegisterPage" element={<LoginRegisterPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
