import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../utils/cartSlice";

const CartTable = () => {
  const products = useSelector((state) => state.cart.products);
  console.log(products);

  const dispatch = useDispatch();

  const handleRemove = (event, _id) => {
    event.preventDefault();

    dispatch(removeFromCart(_id));

    console.log(products);
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

                      <th className="pro-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products.map((product) => (
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
                <a href="/">Continue Shopping</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-5 col-12 mb-40">
              <div className="cart-total fix">
                <h3>Cart Totals</h3>
                <table>
                  <tbody>
                    <tr className="cart-subtotal">
                      <th>Subtotal</th>
                      <td>
                        <span className="amount">$306.00</span>
                      </td>
                    </tr>
                    <tr className="order-total">
                      <th>Total</th>
                      <td>
                        <strong>
                          <span className="amount">$306.00</span>
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="proceed-to-checkout section mt-30">
                  <a href="/">Proceed to Checkout</a>
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
