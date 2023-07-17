import React from "react";

const CheckoutHero = () => {
  return (
    <div>
      <div
        className="page-banner-section section"
        style={{ backgroundImage: "url(assets/images/hero/hero-1.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="page-banner-content col">
              <h1>Checkout</h1>
              <ul className="page-breadcrumb">
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>
                  <a href="checkout.html">Checkout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutHero;
