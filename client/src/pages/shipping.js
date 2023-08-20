import React from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import CheckoutHero from "../layouts/checkoutHero";
import CheckoutComponent from "../layouts/checkoutComponent";
import AboutUsContent from "../layouts/aboutUsContent";
import FaqContent from "../layouts/faqContent";
import ShippingContent from "../layouts/shippingContent";

const Shipping = () => {
  return (
    <div>
      <Header />
      <ShippingContent />
      <Footer />
    </div>
  );
};

export default Shipping;
