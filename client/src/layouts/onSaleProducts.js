import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverAPILocal } from "../App";

const OnSaleProducts = () => {
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
  const products = [
    {
      imageSrc: "assets/images/product/on-sale-1.jpg",
      title: "lorem epsum",
      rating: 4.5,
    },
    {
      image: "assets/images/product/on-sale-2.jpg",
      title: "lorem epsum",
      rating: 5,
    },
    {
      imageSrc: "assets/images/product/on-sale-1.jpg",
      title: "lorem epsum",
      rating: 4.5,
    },
    {
      image: "assets/images/product/on-sale-2.jpg",
      title: "lorem epsum",
      rating: 5,
    },
    {
      imageSrc: "assets/images/product/on-sale-1.jpg",
      title: "lorem epsum",
      rating: 4.5,
    },
    {
      imageSrc: "assets/images/product/on-sale-1.jpg",
      title: "lorem epsum",
      rating: 5,
    },
    {
      imageSrc: "assets/images/product/on-sale-1.jpg",
      title: "lorem epsum",
      rating: 4.5,
    },
    {
      imageSrc: "assets/images/product/on-sale-1.jpg",
      title: "lorem epsum",
      rating: 5,
    },
    {
      imageSrc: "assets/images/product/on-sale-1.jpg",
      title: "lorem epsum",
      rating: 5,
    },
    {
      imageSrc: "assets/images/product/on-sale-1.jpg",
      title: "lorem epsum",
      rating: 5,
    },
    {
      imageSrc: "assets/images/product/on-sale-1.jpg",
      title: "lorem epsum",
      rating: 5,
    },
    {
      imageSrc: "assets/images/product/on-sale-1.jpg",
      title: "lorem epsum",
      rating: 5,
    },
    {
      imageSrc: "assets/images/product/on-sale-1.jpg",
      title: "lorem epsum",
      rating: 5,
    },
    {
      imageSrc: "assets/images/product/on-sale-1.jpg",
      title: "lorem epsum",
      rating: 5,
    },
    // Add more products here...
  ];
  return (
    <div>
      <div className="small-product-slider row row-7 mbn-40">
        {data.map((product, index) => (
          <div className="col mb-40" key={index}>
            <div className="on-sale-product">
              <a href="single-product.html" className="image">
                <img src={product.imageSrc} alt="Image" />
              </a>
              <div className="content text-center">
                <h4 className="title">
                  <a href="single-product.html">{product.title}</a>
                </h4>
                <span className="price">
                  $<span className="old">$</span>
                </span>
                <div className="ratting">
                  {[...Array(5)].map((_, i) => (
                    <i
                      className={`fa fa-star${
                        i < Math.floor(product.rating) ? "" : "-half-o"
                      }`}
                      key={i}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnSaleProducts;
