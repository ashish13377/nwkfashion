import React from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import ShopHero from "../layouts/shopHero";
import ShopRightPart from "../layouts/shopRightPart";
import ShopLeftPart from "../layouts/shopLeftPart";
const ShopPage = () => {
  return (
    <div>
      <Header />
      <ShopHero />
      <div className="page-section section section-padding">
        <div className="container">
          <div className="row row-30 mbn-40">
            <div className="col-xl-9 col-lg-8 col-12 order-1 order-lg-2 mb-40">
              <ShopRightPart />
            </div>
            <div className="col-xl-3 col-lg-4 col-12 order-2 order-lg-1 mb-40">
              <ShopLeftPart />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShopPage;
