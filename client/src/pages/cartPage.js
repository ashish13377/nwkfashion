import React from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import Banner from "../layouts/banner";
import Hero from "../layouts/hero";

import OnSale from "../layouts/onSale";
import Feature from "../layouts/feature";
import PopularProducts from "../layouts/homePopularProducts";
import CartHero from "../layouts/cartHero";
import CartTable from "../layouts/cartTable";
export default function cartPage() {
  return (
    <div>
      <Header />
      <CartHero />
      <CartTable />
      <Footer />
    </div>
  );
}
