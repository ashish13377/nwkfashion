import React from "react";

const singleProductHero = () => {
  return (
    <div>
      <div
        className="page-banner-section section"
        // style={{ backgroundImage: "url(assets/images/hero/hero-1.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="page-banner-content col">
              <h1>Single Product</h1>
              <ul className="page-breadcrumb">
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>
                  <a href="single-product.html">Single Product</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default singleProductHero;
