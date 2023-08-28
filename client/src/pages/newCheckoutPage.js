import React from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import CheckoutHero from "../layouts/checkoutHero";
import CheckoutComponent from "../layouts/checkoutComponent";
import NewCheckoutComponent from "../layouts/newCheckoutComponent";

const NewCheckoutPage = () => {
  return (
    <div>
      <Header />
      <CheckoutHero />
      {/* <CheckoutComponent /> */}
      <NewCheckoutComponent />
      <Footer />
    </div>
  );
};

export default NewCheckoutPage;
