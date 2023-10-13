import React from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import CheckoutHero from "../layouts/checkoutHero";
import CheckoutComponent from "../layouts/checkoutComponent";
import AboutUsContent from "../layouts/aboutUsContent";
import CancellationContent from "../layouts/cancellationContent";

const Cancellation = () => {
  return (
    <div>
      <Header />
      <CancellationContent />
      <Footer />
    </div>
  );
};

export default Cancellation;
