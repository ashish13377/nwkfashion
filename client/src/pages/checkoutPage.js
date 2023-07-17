import React from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import CheckoutHero from "../layouts/checkoutHero";
import CheckoutComponent from "../layouts/checkoutComponent";

const checkoutPage = () => {
  return (
    <div>
      <Header />
      <CheckoutHero />
      <CheckoutComponent />
      <Footer />
    </div>
  );
};

export default checkoutPage;
