import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

  const products = useSelector(
    (state) =>
      state.cart.products.filter((product) => product.userId === userId) // Filter products based on userId
  );

  const selectSelectedDressInfo = (state) =>
    state.selectedDress.selectedDressData;

  console.log("products:", products);

  const selectedDressInfo = useSelector(selectSelectedDressInfo);
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
            </div>
            <div className="col-lg-4 col-md-5 col-12 mb-40">
              <div className="cart-total fix">
                <h3>Cart Totals</h3>
                <table>
                  <tbody>
                    <tr className="cart-subtotal">
                      <th>Total</th>
                      <td>
                        <span className="amount">₹{calculateSubtotal()}</span>
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
