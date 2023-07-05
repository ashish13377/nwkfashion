import React from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import Banner from "../layouts/banner";
import Hero from "../layouts/hero";

import OnSale from "../layouts/onSale";
import Feature from "../layouts/feature";
import PopularProducts from "../layouts/homePopularProducts";
export default function home() {
  return (
    <div>
      <Header />
      <Hero />
      <Banner />

      <PopularProducts />
      <OnSale />
      <Feature />
      <Footer />
    </div>
  );
}
