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

const BestDealItem = ({ imageSrc, title, rating, price, _id }) => {
  return (
    <div className="slide-item">
      <div className="best-deal-product">
        <div className="image">
          <img src={"assets/images/product/product-3.jpg"} alt="Image" />
        </div>
        <div className="content-top">
          <div className="content-top-left">
            <h4 className="title">
              <Link to={`/products/${_id}`}>{title}</Link>
            </h4>
            <Rating value={rating} />
          </div>
          <div className="content-top-right">
            <span className="price">
              $ <span className="old">{price}</span>
            </span>
          </div>
        </div>
        <div className="content-bottom">
          <div className="countdown" data-countdown="2023/06/20" />

          <Link to={`/products/${_id}`} data-hover="SHOP NOW">
            {" "}
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

const BestDealCarousel = ({ products }) => {
  const productIdsToRender = [
    "64b646e0c86d90418da9258d",
    "64b646e4c86d90418da92594",
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
