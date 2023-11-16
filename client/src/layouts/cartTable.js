import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { setDiscount } from "../utils/discountSlice";
import { clearDiscount } from "../utils/discountSlice";
import { setCouponCode, clearCouponCode } from "../utils/couponSlice"; // Import the new actions

import {
  removeFromCart,
  increaseQuantiti,
  decreaseQuantiti,
} from "../utils/cartSlice";
import { removeFromWishlist } from "../utils/wishlistSlice";
import { updateSelectedDressData } from "../utils/selectedDressSlice";
import { Link } from "react-router-dom";

const CartTable = () => {
  const userId = useSelector((state) => state.cart.userId);
  const couponCode = useSelector((state) => state.coupon.code);
  const products = useSelector(
    (state) =>
      state.cart.products.filter((product) => product.userId === userId) // Filter products based on userId
  );
  console.log("products:", products);
  const selectSelectedDressInfo = (state) =>
    state.selectedDress.selectedDressData;

  const selectedDressInfo = useSelector(selectSelectedDressInfo);
  const discount = useSelector((state) => state.discount);
  console.log(selectedDressInfo);

  const dispatch = useDispatch();

  const handleRemove = (event, productId) => {
    event.preventDefault();
    dispatch(removeFromWishlist(productId));
    dispatch(removeFromCart(productId));
    dispatch(updateSelectedDressData(productId));
  };

  const calculateSubtotal = () => {
    let subtotal = 0;

    products.forEach((product) => {
      const price = parseFloat(
        product.price.replace("$", "") * product.quantiti
      );

      subtotal += price;
    });

    return subtotal;
  };
  const shippingCost = 10;

  const handleIncreaseQuantiti = (productId) => {
    dispatch(increaseQuantiti(productId)); // Dispatch the action with the product ID
  };

  const handleDecreaseQuantiti = (productId) => {
    dispatch(decreaseQuantiti(productId)); // Dispatch the action with the product ID
  };

  const handleApplyCoupon = (event) => {
    event.preventDefault();

    // Replace the following logic with your actual coupon validation and discount application
    if (couponCode === "EXAMPLECODE") {
      dispatch(setDiscount(calculateSubtotal() * 0.1)); // Apply a 10% discount
      toast.success("Coupon added!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      }); // Show success notification
    } else {
      dispatch(clearDiscount());
      toast.warning("Invalid coupon code", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      }); // Show success notification // Show error notification
    }
  };
  return (
    <div className="page-section section section-padding">
      <ToastContainer />
      <div className="container">
        <form>
          <div className="row mbn-40">
            <div className="col-12 mb-40">
              <div className="cart-table table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th className="pro-thumbnail">Image</th>
                      <th className="pro-title">Product</th>
                      <th className="pro-price">Price</th>
                      <th class="pro-quantity">Quantity</th>
                      <th className="pro-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products.map((product, index) => (
                        <tr key={product.colors._id}>
                          <td className="pro-thumbnail">
                            <Link to={`/products/${product._id}`}>
                              {product.colors.map((color) => {
                                const selectedDress = selectedDressInfo.find(
                                  (dress) => color._id === dress.selectedDressId
                                );

                                if (selectedDress) {
                                  return (
                                    <img
                                      key={color._id}
                                      src={selectedDress.selectedDressImg}
                                      alt="productImage"
                                      height="100px"
                                    />
                                  );
                                }

                                return null;
                              })}
                            </Link>
                          </td>

                          <td className="pro-title">
                            <Link to={`/products/${product._id}`}>
                              {product.title}
                            </Link>
                          </td>
                          <td className="pro-price">
                            <span className="amount">{product.price}</span>
                          </td>

                          <td className="pro-quantity">
                            <div
                              className="pro-qty"
                              style={{ display: "flex", padding: "0 14px" }}
                            >
                              <a
                                // onClick={() =>
                                //   handleDecreaseQuantiti(product._id)
                                // }

                                onClick={() => {
                                  // event.preventDefault(); // Prevent the default link behavior
                                  product.colors.forEach((color) => {
                                    const selectedDress =
                                      selectedDressInfo.find(
                                        (dress) =>
                                          color._id === dress.selectedDressId
                                      );

                                    if (selectedDress) {
                                      console.log(
                                        selectedDress.selectedDressId
                                      );
                                      handleDecreaseQuantiti(
                                        selectedDress.selectedDressId
                                      );
                                    }
                                  });
                                }}
                                style={{ position: "relative", top: "5px" }}
                              >
                                -
                              </a>

                              <input
                                type="text"
                                value={product.quantiti}
                                readOnly
                              />

                              <a
                                onClick={() => {
                                  product.colors.forEach((color) => {
                                    const selectedDress =
                                      selectedDressInfo.find(
                                        (dress) =>
                                          color._id === dress.selectedDressId
                                      );

                                    if (selectedDress) {
                                      console.log(
                                        selectedDress.selectedDressId
                                      );
                                      handleIncreaseQuantiti(
                                        selectedDress.selectedDressId
                                      );
                                    }
                                  });
                                }}
                                style={{ position: "relative", top: "5px" }}
                              >
                                +
                              </a>
                            </div>
                          </td>

                          <td className="pro-remove">
                            <a
                              href="/"
                              onClick={(event) => {
                                event.preventDefault(); // Prevent the default link behavior
                                product.colors.forEach((color) => {
                                  const selectedDress = selectedDressInfo.find(
                                    (dress) =>
                                      color._id === dress.selectedDressId
                                  );

                                  if (selectedDress) {
                                    console.log(selectedDress.selectedDressId);
                                    handleRemove(
                                      event,
                                      selectedDress.selectedDressId
                                    );
                                  }
                                });
                              }}
                            >
                              ×
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-8 col-md-7 col-12 mb-40">
              <div className="cart-buttons mb-30">
                <Link to="/">Continue Shopping</Link>
              </div>
              <div className="cart-coupon">
                <h4>Coupon</h4>
                <p>Enter your coupon code if you have one.</p>
                <div className="cuppon-form">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => dispatch(setCouponCode(e.target.value))}
                  />
                  <input
                    type="submit"
                    value="Apply Coupon"
                    onClick={handleApplyCoupon}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-5 col-12 mb-40">
              <div className="cart-total fix">
                <h3>Cart Totals</h3>
                <table>
                  <tbody>
                    <tr className="cart-subtotal">
                      <th>Sub-total</th>
                      <td>
                        <span className="amount">₹{calculateSubtotal()}</span>
                      </td>
                    </tr>
                    <tr className="cart-subtotal">
                      <th>discount</th>

                      <td>
                        <span className="amount">₹{discount.toFixed(2)}</span>
                      </td>
                    </tr>
                    <tr className="cart-subtotal">
                      <th>Total:</th>
                      <td>
                        <span className="amount">
                          ₹{calculateSubtotal() - discount}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="proceed-to-checkout section mt-30">
                  {products.length === 0 ? (
                    <></>
                  ) : (
                    <>
                      <Link to="/checkoutPage">Proceed to checkout</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CartTable;
