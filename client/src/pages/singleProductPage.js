import React from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import SingleProductHero from "../layouts/singleProductHero";
import SingleProductDescription from "../layouts/singleProductDescription";

export default function singleProductPage() {
  return (
    <div>
      <Header />
      <SingleProductHero />
      <SingleProductDescription />

      <Footer />
    </div>
  );
}
