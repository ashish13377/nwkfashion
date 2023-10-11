import React from "react";
import { Link } from "react-router-dom";

const banner = () => {
  return (
    <div>
      <div className="banner-section section mt-40">
        <div className="container-fluid">
          <div className="row row-10 mbn-20">
            <div className="col-lg-4 col-md-6 col-12 mb-20">
              <div className="banner banner-1 content-left content-middle">
                <a href="#" className="image">
                  <img
                    src="assets/images/banner/banner-1.jpg"
                    alt="Banner Image"
                  />
                </a>
                <div className="content">
                  <h1>
                    New Arrival <br />
                    GET 30% OFF
                  </h1>
                  <a href="#" data-hover="SHOP NOW">
                    SHOP NOW
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 mb-20">
              <div className="banner banner-1 content-left content-top">
                <a href="#" className="image">
                  <img
                    src="assets/images/banner/banner-3.jpg"
                    alt="Banner Image"
                  />
                </a>
                <div className="content">
                  <h1>lorem epsum</h1>
                  <a href="#" data-hover="SHOP NOW">
                    SHOP NOW
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 mb-20">
              <div className="banner banner-1 content-left content-top">
                <a href="#" className="image">
                  <img
                    src="assets/images/banner/banner-3.jpg"
                    alt="Banner Image"
                  />
                </a>
                <div className="content">
                  <h1>lorem epsum</h1>
                  <a href="#" data-hover="SHOP NOW">
                    SHOP NOW
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default banner;
