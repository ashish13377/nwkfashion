import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverAPILocal } from "../App";

const OnSaleProducts = ({ products }) => {
  const productIdsToRender = [
    "64b64796c86d90418da92601",
    "64b6479cc86d90418da92608",
    "64b64747c86d90418da925c7",
    "64b6474ac86d90418da925ce",
  ];

  const filteredProducts = products.filter((product) =>
    productIdsToRender.includes(product._id)
  );

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
