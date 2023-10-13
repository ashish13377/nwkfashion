import React from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import CheckoutHero from "../layouts/checkoutHero";
import CheckoutComponent from "../layouts/checkoutComponent";
import AboutUsContent from "../layouts/aboutUsContent";
import CancellationContent from "../layouts/cancellationContent";
import PrivacyContent from "../layouts/privacyContent";

const Privacy = () => {
  return (
    <div>
      <Header />
      <PrivacyContent />
      <Footer />
    </div>
  );
};

export default Privacy;
