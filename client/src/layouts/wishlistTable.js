import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../utils/wishlistSlice";
import { addToCart } from "../utils/cartSlice";

const WishlistTable = () => {
  const products = useSelector((state) => state.wishlist.wishlists);
  const dispatch = useDispatch();

  const handleRemove = (event, _id) => {
    event.preventDefault();
    dispatch(removeFromWishlist(_id));
  };

  const handleAddToCart = (event, product) => {
    event.preventDefault();
    dispatch(addToCart(product));
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
                        <th className="pro-quantity">Quantity</th>
                        <th className="pro-subtotal">Total</th>
                        <th className="pro-remove">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products &&
                        products.map((product) => (
                          <tr key={product._id}>
                            <td className="pro-thumbnail">
                              <a href="#">
                                <img src={product.image} alt={product.title} />
                              </a>
                            </td>
                            <td className="pro-title">
                              <a href="#">{product.title}</a>
                            </td>
                            <td className="pro-price">
                              <span className="amount">{product.price}</span>
                            </td>
                            <td className="pro-quantity">
                              <div className="pro-qty">
                                <input type="text" defaultValue={1} />
                              </div>
                            </td>
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
                              <button
                                onClick={(event) =>
                                  handleRemove(event, product._id)
                                }
                              >
                                ×
                              </button>
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
