import React from "react";
import OnSaleProducts from "./onSaleProducts";
import BestDealCarousel from "./bestDealCaraousel";

const onSale = () => {
  return (
    <div>
      <div className="product-section section section-padding pt-0">
        <div className="container">
          <div className="row mbn-40">
            {/* <div className="col-lg-4 col-md-6 col-12 mb-40">
              <div className="row">
                <div className="section-title text-start col mb-30">
                  <h1>Best Deal</h1>
                  <p>Exclusive deals for you</p>
                </div>
              </div>
              <div className="best-deal-slider w-100">
                <div className="slide-item">
                  <div className="best-deal-product">
                    <div className="image">
                      <img
                        src="assets/images/product/best-deal-1.jpg"
                        alt="Image"
                      />
                    </div>
                    <div className="content-top">
                      <div className="content-top-left">
                        <h4 className="title">
                          <a href="#">lorem epsum</a>
                        </h4>
                        <div className="ratting">
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star-half-o" />
                        </div>
                      </div>
                      <div className="content-top-right">
                        <span className="price">
                          $ <span className="old">$</span>
                        </span>
                      </div>
                    </div>
                    <div className="content-bottom">
                      <div className="countdown" data-countdown="2023/06/20" />
                      <a href="#" data-hover="SHOP NOW">
                        SHOP NOW
                      </a>
                    </div>
                  </div>
                </div>
                <div className="slide-item">
                  <div className="best-deal-product">
                    <div className="image">
                      <img
                        src="assets/images/product/best-deal-2.jpg"
                        alt="Image"
                      />
                    </div>
                    <div className="content-top">
                      <div className="content-top-left">
                        <h4 className="title">
                          <a href="#">lorem epsum</a>
                        </h4>
                        <div className="ratting">
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star-o" />
                        </div>
                      </div>
                      <div className="content-top-right">
                        <span className="price">
                          $ <span className="old">$</span>
                        </span>
                      </div>
                    </div>
                    <div className="content-bottom">
                      <div className="countdown" data-countdown="2023/06/20" />
                      <a href="#" data-hover="SHOP NOW">
                        SHOP NOW
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
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
