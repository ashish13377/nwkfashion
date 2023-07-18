import { Link } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlice";

import { addToWishlist } from "../utils/wishlistSlice";
const PopularProducts = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    console.log(product);
  };
  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
    console.log(product);
  };

  const productIdsToRender = [
    "64b646e0c86d90418da9258d",
    "64b646e4c86d90418da92594",
    "64ab9d3279afebbac80a854a",
    "64ab9d3379afebbac80a854d",
    "64b64796c86d90418da92601",
    "64b6479cc86d90418da92608",
    "64b64747c86d90418da925c7",
    "64b6474ac86d90418da925ce",
  ]; // Manually provide the product IDs to render

  const filteredProducts = products.filter((product) =>
    productIdsToRender.includes(product._id)
  );

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
                      {/* product.imageSrc */}
                      <img
                        src={"assets/images/product/product-3.jpg"}
                        alt="Product"
                      />
                      <div className="image-overlay">
                        <div className="action-buttons">
                          <button onClick={() => handleAddToCart(product)}>
                            add to cart
                          </button>
                          <button onClick={() => handleAddToWishlist(product)}>
                            add to wishlist
                          </button>
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
