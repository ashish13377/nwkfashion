import React from "react";

const feature = () => {
  return (
    <div>
      <div
        className="feature-section bg-theme-two section section-padding fix"
        style={{
          backgroundImage: "url(assets/images/pattern/pattern-dot.png)",
        }}
      >
        <div className="container">
          <div className="feature-wrap row justify-content-between mbn-30">
            <div className="col-md-4 col-12 mb-30">
              <div className="feature-item text-center">
                <div className="icon">
                  <img src="assets/images/feature/feature-1.png" alt="Image" />
                </div>
                <div className="content">
                  <h3>Free Shipping</h3>
                  <p>Start from $100</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 mb-30">
              <div className="feature-item text-center">
                <div className="icon">
                  <img src="assets/images/feature/feature-2.png" alt="Image" />
                </div>
                <div className="content">
                  <h3>Money Back Guarantee</h3>
                  <p>Back within 25 days</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 mb-30">
              <div className="feature-item text-center">
                <div className="icon">
                  <img src="assets/images/feature/feature-3.png" alt="Image" />
                </div>
                <div className="content">
                  <h3>Secure Payment</h3>
                  <p>Payment Security</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default feature;
