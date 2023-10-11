import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverAPILocal } from "../App";

const OnSaleProducts = ({ products }) => {
  const productIdsToRender = [
    "65202ec50c24bf35ed99b3f7",
    "65202f3c0c24bf35ed9a0a09",
    "65202fb00c24bf35ed9a589e",
    "6520304d0c24bf35ed9accb4",
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
              <a
                href="single-product.html"
                className="image"
                // style={{ height: "206px" }}
              >
                {/* product.imageSrc */}
                <img
                  src={product.colors[0].zoomImage}
                  alt="Image"
                  height={"206px"}
                />
              </a>
              <div className="content text-center">
                <h4 className="title">
                  <Link to={`/products/${product._id}`}>{product.title}</Link>
                </h4>
                <span className="price">
                  &#8377;{product.price}
                  {/* <span className="old">&#8377;</span> */}
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
