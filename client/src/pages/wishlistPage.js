import React from "react";
import WishlistHero from "../layouts/wishlistHero";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import WishlistTable from "../layouts/wishlistTable";
const WishlistPage = () => {
  return (
    <div>
      <Header />
      <WishlistHero />
      <WishlistTable />
      <Footer />
    </div>
  );
};

export default WishlistPage;
