import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverAPILocal } from "../App";

const products = [
  {
    imageSrc: "assets/images/product/best-deal-1.jpg",
    title: "lorem epsum",
    rating: 4.5,
    price: "",
  },
  {
    imageSrc: "assets/images/product/best-deal-2.jpg",
    title: "lorem epsum",
    rating: 4,
    price: "",
  },
];

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
const BestDealItem = ({ imageSrc, title, rating, price }) => {
  return (
    <div className="slide-item">
      <div className="best-deal-product">
        <div className="image">
          <img src={imageSrc} alt="Image" />
        </div>
        <div className="content-top">
          <div className="content-top-left">
            <h4 className="title">
              <a href="#">{title}</a>
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
          <a href="#" data-hover="SHOP NOW">
            SHOP NOW
          </a>
        </div>
      </div>
    </div>
  );
};

const BestDealCarousel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverAPILocal}/products`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log(data);

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
        {data.map((product, index) => (
          <BestDealItem key={index} {...product} />
        ))}
      </Slider>
    </div>
  );
};

export default BestDealCarousel;
