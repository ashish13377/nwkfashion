import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverAPILocal } from "../App";

const PopularProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const productIds = [
      "64ab9d2979afebbac80a8544",
      "64ab9d3279afebbac80a8547",
      "64ab9d3279afebbac80a854a",
      "64ab9d3379afebbac80a854d",
      "64ab9d3479afebbac80a8550",
      "64ab9d3579afebbac80a8553",
      "64ab9d3579afebbac80a8556",
      "64ab9d3679afebbac80a8559",
    ]; // Manually provide the product IDs

    const fetchFilteredProducts = async () => {
      try {
        const response = await axios.get(`${serverAPILocal}/products`);
        const filteredProducts = response.data.filter((product) =>
          productIds.includes(product._id)
        );
        setFilteredProducts(filteredProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilteredProducts();
  }, []);

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
            {filteredProducts.map((product, index) => (
              <div
                className="col-xl-3 col-lg-4 col-md-6 col-12 mb-40"
                key={index}
              >
                <div className="product-item">
                  <div className="product-inner">
                    <div className="image">
                      <img
                        src={"assets/images/product/product-3.jpg"}
                        alt="Product"
                      />
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
