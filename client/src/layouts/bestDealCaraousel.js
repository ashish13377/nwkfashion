import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { serverAPILocal } from "../App";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Rating = ({ value }) => {
  return (
    <div className="rating">
      {[...Array(5)].map((_, i) => {
        const ratingClass = i < Math.floor(value) ? "" : "-half-o";
        return <i className={`fa fa-star${ratingClass}`} key={i} />;
      })}
    </div>
  );
};

const BestDealItem = ({ imageSrc, title, rating, price, _id, colors }) => {
  return (
    <div className="slide-item">
      <Link to={`/products/${_id}`}>
        <div className="best-deal-product" style={{ height: "450px" }}>
          <div className="image">
            {/* colors[0].zoomImage */}
            <img src={colors[0].zoomImage} alt="Image" />
          </div>
          <div className="content-top">
            {/* <div className="content-top-left">
            <h4 className="title">
              <Link to={`/products/${_id}`}>{title}</Link>
            </h4>
            <Rating value={rating} />
          </div>
          <div className="content-top-right">
            <span className="price">
              $ <span className="old">{price}</span>
            </span>
          </div> */}
          </div>
          <div className="content-bottom">
            <div className="countdown" data-countdown="2023/06/20" />
            <div className="content-top-left">
              <div className="content-top-left">
                <h4 className="title">
                  <Link to={`/products/${_id}`}>{title}</Link>
                </h4>
                <Rating value={rating} />
              </div>
              <div className="content-top-right">
                <span className="price">
                  &#8377; <span className="old">{price}</span>
                </span>
              </div>
            </div>
            <Link to={`/products/${_id}`} data-hover="SHOP NOW">
              {" "}
              SHOP NOW
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

const BestDealCarousel = ({ products }) => {
  const productIdsToRender = [
    "65202ec50c24bf35ed99b3f7",
    "6520d2b20c24bf35eda497d6",
  ];

  const filteredProducts = products.filter((product) =>
    productIdsToRender.includes(product._id)
  );

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
        {filteredProducts.map((product, index) => (
          <BestDealItem key={index} {...product} />
        ))}
      </Slider>
    </div>
  );
};

export default BestDealCarousel;
