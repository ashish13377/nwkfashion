import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantiti,
  decreaseQuantiti,
} from "../utils/cartSlice";
import { Link } from "react-router-dom";

const CartTable = () => {
  const userId = useSelector((state) => state.cart.userId);

  const products = useSelector(
    (state) =>
      state.cart.products.filter((product) => product.userId === userId) // Filter products based on userId
  );
  console.log("UserId:", userId);
  console.log("Products:", products);

  const dispatch = useDispatch();

  const handleRemove = (event, productId) => {
    event.preventDefault();

    dispatch(removeFromCart(productId));
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

  return (
    <div className="page-section section section-padding">
      <div className="container">
        <form action="#">
          <div className="row mbn-40">
            <div className="col-12 mb-40">
              <div className="cart-table table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th className="pro-thumbnail">Image</th>
                      <th className="pro-title">Product</th>
                      <th className="pro-price">Price</th>
                      <th class="pro-quantity">Quantiti</th>
                      <th className="pro-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products.map((product, index) => (
                        <tr key={product._id}>
                          <td className="pro-thumbnail">
                            <a href="/">
                              <img src={product.imageSrc} alt="productImage" />
                            </a>
                          </td>
                          <td className="pro-title">
                            <a href="/">{product.title}</a>
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
                                onClick={() =>
                                  handleDecreaseQuantiti(product._id)
                                }
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
                                onClick={() =>
                                  handleIncreaseQuantiti(product._id)
                                }
                                style={{ position: "relative", top: "5px" }}
                              >
                                +
                              </a>
                            </div>
                          </td>

                          <td className="pro-remove">
                            <a
                              href="/"
                              onClick={(event) =>
                                handleRemove(event, product._id)
                              }
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
            </div>
            <div className="col-lg-4 col-md-5 col-12 mb-40">
              <div className="cart-total fix">
                <h3>Cart Totals</h3>
                <table>
                  <tbody>
                    <tr className="cart-subtotal">
                      <th>Total</th>
                      <td>
                        <span className="amount">${calculateSubtotal()}</span>
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
