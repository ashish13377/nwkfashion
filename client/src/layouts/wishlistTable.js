import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { addToCart } from "../utils/cartSlice";
import {
  removeFromWishlist,
  increaseQuantiti,
  decreaseQuantiti,
} from "../utils/wishlistSlice";
const WishlistTable = () => {
  const userId = useSelector((state) => state.wishlist.userId);

  const products = useSelector(
    (state) =>
      state.wishlist.wishlists.filter((product) => product.userId === userId) // Filter products based on userId
  );
  console.log(products);
  console.log(userId);
  const dispatch = useDispatch();

  const handleRemove = (event, productId) => {
    event.preventDefault();

    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (event, product) => {
    event.preventDefault();
    dispatch(addToCart(product));
  };
  const handleIncreaseQuantiti = (productId) => {
    dispatch(increaseQuantiti(productId)); // Dispatch the action with the product ID
  };

  const handleDecreaseQuantiti = (productId) => {
    dispatch(decreaseQuantiti(productId)); // Dispatch the action with the product ID
  };

  return (
    <div>
      <div className="page-section section section-padding">
        <div className="container">
          <form action="#">
            <div className="row">
              <div className="col-12">
                <div className="cart-table table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th className="pro-thumbnail">Image</th>
                        <th className="pro-title">Product</th>
                        <th className="pro-price">Price</th>
                        {/* <th class="pro-quantity">Quantiti</th> */}
                        <th className="pro-subtotal">Total</th>
                        <th className="pro-remove">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products &&
                        products.map((product, index) => (
                          <tr key={product._id}>
                            <td className="pro-thumbnail">
                              <a href="#">
                                <img
                                  src={product.imageSrc}
                                  alt={product.title}
                                />
                              </a>
                            </td>
                            <td className="pro-title">
                              <a href="#">{product.title}</a>
                            </td>
                            <td className="pro-price">
                              <span className="amount">{product.price}</span>
                            </td>

                            {/* <td className="pro-quantity">
                              <div className="pro-qty">
                                <a
                                  onClick={() =>
                                    handleIncreaseQuantiti(product._id)
                                  }
                                >
                                  +
                                </a>

                                <input
                                  type="text"
                                  value={product.quantiti}
                                  readOnly
                                />
                                <a
                                  onClick={() =>
                                    handleDecreaseQuantiti(product._id)
                                  }
                                >
                                  -
                                </a>
                              </div>
                            </td> */}

                            <td className="pro-add-cart">
                              <button
                                onClick={(event) =>
                                  handleAddToCart(event, product)
                                }
                              >
                                add to cart
                              </button>
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WishlistTable;
