import React from "react";
import OnSaleProducts from "./onSaleProducts";
import BestDealCarousel from "./bestDealCaraousel";

const onSale = () => {
  return (
    <div>
      <div className="product-section section section-padding pt-0">
        <div className="container">
          <div className="row mbn-40">
            <BestDealCarousel />
            <div className="col-lg-8 col-md-6 col-12 ps-3 ps-lg-4 ps-xl-5 mb-40">
              <div className="row">
                <div className="section-title text-start col mb-30">
                  <h1>On Sale Products</h1>
                  <p>All featured product find here</p>
                </div>
              </div>

              <OnSaleProducts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default onSale;
