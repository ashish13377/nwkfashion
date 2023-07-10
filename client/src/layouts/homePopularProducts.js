import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverAPILocal } from "../App";
const PopularProducts = () => {
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
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Lorem Epsum 1",
      rating: 4,
      sizes: ["S", "M", "L", "XL"],
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
      price: "$",
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Lorem Epsum 1",
      rating: 4,
      sizes: ["S", "M", "L", "XL"],
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
      price: "$",
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Lorem Epsum 1",
      rating: 4,
      sizes: ["S", "M", "L", "XL"],
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
      price: "$",
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Lorem Epsum 1",
      rating: 4,
      sizes: ["S", "M", "L", "XL"],
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
      price: "$",
    },

    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Lorem Epsum 1",
      rating: 4,
      sizes: ["S", "M", "L", "XL"],
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
      price: "$",
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Lorem Epsum 1",
      rating: 4,
      sizes: ["S", "M", "L", "XL"],
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
      price: "$",
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Lorem Epsum 1",
      rating: 4,
      sizes: ["S", "M", "L", "XL"],
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
      price: "$",
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Lorem Epsum 1",
      rating: 4,
      sizes: ["S", "M", "L", "XL"],
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
      price: "$",
    },

    // Add more products as needed
  ];

  return (
    <div>
      <div className="product-section section section-padding">
        <div className="container">
          <div className="row">
            <div className="section-title text-center col mb-30">
              <h1>Popular Products</h1>
              <p>All popular products can be found here</p>
            </div>
          </div>
          <div className="row mbn-40">
            {data.map((product, index) => (
              <div
                className="col-xl-3 col-lg-4 col-md-6 col-12 mb-40"
                key={index}
              >
                <div className="product-item">
                  <div className="product-inner">
                    <div className="image">
                      <img src={product.imageSrc} alt="Product" />
                      <div className="image-overlay">
                        <div className="action-buttons">
                          <button>add to cart</button>
                          <button>add to wishlist</button>
                        </div>
                      </div>
                    </div>
                    <div className="content">
                      <div className="content-left">
                        <h4 className="title">
                          <Link link to="/singleProductPage">
                            {product.title}
                          </Link>
                        </h4>
                        <div className="ratting">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`fa fa-star${
                                i < product.rating ? "" : "-o"
                              }`}
                            />
                          ))}
                        </div>
                        <h5 className="size">
                          Size:{" "}
                          {product.sizes.map((size, i) => (
                            <span key={i}>{size}</span>
                          ))}
                        </h5>
                        <h5 className="color">
                          Color:{" "}
                          {product.colors.map((color, i) => (
                            <span key={i} style={{ backgroundColor: color }} />
                          ))}
                        </h5>
                      </div>
                      <div className="content-right">
                        <span className="price">{product.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularProducts;
