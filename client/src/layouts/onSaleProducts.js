import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverAPILocal } from "../App";

const OnSaleProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const productIds = [
      "64ab9d2979afebbac80a8544",
      "64ab9d3279afebbac80a8547",
      "64ab9d3279afebbac80a854a",
      "64ab9d3379afebbac80a854d",
      "64ab9d3479afebbac80a8550",
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
      <div className="small-product-slider row row-7 mbn-40">
        {filteredProducts.map((product, index) => (
          <div className="col mb-40" key={index}>
            <div className="on-sale-product">
              <a href="single-product.html" className="image">
                {/* product.imageSrc */}
                <img src={"assets/images/product/product-3.jpg"} alt="Image" />
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
