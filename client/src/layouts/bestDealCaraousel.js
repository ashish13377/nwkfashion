import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BestDealCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Adjust the interval as needed
  };

  return (
    <div className="col-lg-4 col-md-6 col-12 mb-40">
      <div className="row">
        <div className="section-title text-start col mb-30">
          <h1>Best Deal</h1>
          <p>Exclusive deals for you</p>
        </div>
      </div>
      <Slider {...settings} className="best-deal-slider w-100">
        <div className="slide-item">
          <div className="best-deal-product">
            <div className="image">
              <img src="assets/images/product/best-deal-1.jpg" alt="Image" />
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
              <img src="assets/images/product/best-deal-2.jpg" alt="Image" />
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
      </Slider>
    </div>
  );
};

export default BestDealCarousel;
