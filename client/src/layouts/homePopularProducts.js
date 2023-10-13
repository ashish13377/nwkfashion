import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlice";
import { addToWishlist } from "../utils/wishlistSlice";
import { updateSelectedDress } from "../utils/selectedDressSlice";
const PopularProducts = ({ products }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUser(data);
    // if (!data) {
    //   navigate("/loginRegisterPage");
    // }
  }, []);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // dispatch(
    //   updateSelectedDress(product.colors[0].zoomImage, product.colors[0]._id)
    // );

    console.log(product);
  };
  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
    console.log(product);
  };

  const productIdsToRender = [
    "65202ec50c24bf35ed99b3f7",
    "65202f3c0c24bf35ed9a0a09",
    "65202fb00c24bf35ed9a589e",
    "6520304d0c24bf35ed9accb4",
    "652030e30c24bf35ed9b419f",
    "652031960c24bf35ed9bcd70",
    "6520d2b20c24bf35eda497d6",
    "6520328c0c24bf35ed9c6b9e",
  ]; // Manually provide the product IDs to render

  const filteredProducts = products.filter((product) =>
    productIdsToRender.includes(product._id)
  );

  console.log(filteredProducts);

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
                  <Link to={`/products/${product._id}`}>
                    <div className="product-inner" style={{ height: "260px" }}>
                      <div className="image">
                        {/* product.imageSrc */}
                        {/* product.colors[0].zoomImage */}
                        <img
                          src={product.colors[0].zoomImage}
                          alt="Product"
                          // height={"300px"}
                        />
                        <div className="image-overlay">
                          {/* {user ? (
                          <div className="action-buttons">
                            <button onClick={() => handleAddToCart(product)}>
                              add to cart
                            </button>
                            <button
                              onClick={() => handleAddToWishlist(product)}
                            >
                              add to wishlist
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="action-buttons">
                              <Link to="/loginRegisterPage">
                                {" "}
                                <button>Login/Signup</button>
                              </Link>
                            </div>
                          </>
                        )} */}
                        </div>
                      </div>
                      <div className="content">
                        <div className="content-left">
                          <h4 className="title">
                            <Link to={`/products/${product._id}`}>
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
                            {/* Size:{" "}
                          {product.sizes.map((size, i) => (
                            <span key={i}>{size}</span>
                          ))} */}
                          </h5>
                          <h5 className="color">
                            Color:{" "}
                            {product.colors.map((color, i) => (
                              <span
                                key={i}
                                style={{ backgroundColor: color.color }}
                              />
                            ))}
                          </h5>
                        </div>
                        <div className="content-right">
                          <span className="price">&#8377;{product.price}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
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
