import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSelectedDressData } from "../utils/selectedDressSlice";
import { addToCart } from "../utils/cartSlice";
import { updateSelectedDress } from "../utils/selectedDressSlice";
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
  console.log("products", products);

  const dispatch = useDispatch();

  const selectSelectedDressInfo = (state) =>
    state.selectedDress.selectedDressData;

  const selectedDressInfo = useSelector(selectSelectedDressInfo);
  console.log("selected dress info:", selectedDressInfo);

  const handleRemove = (event, productId) => {
    event.preventDefault();

    dispatch(removeFromWishlist(productId));
    dispatch(updateSelectedDressData(productId));
  };

  const handleAddToCart = (event, product) => {
    // console.log("add to cart", product);
    event.preventDefault();

    dispatch(updateSelectedDress({ selectedDressImg, selectedDressId }));
    // Dispatch the addToCart action with the payload
    dispatch(addToCart(product));

    // console.log(product);
  };

  // const selectedDressImg = products?.colors?.find((item) =>
  //   selectedDressInfo.find((dressInfo) => {
  //     console.log("Selected Dress ID:", item);
  //     if (dressInfo.selectedDressId === item._id) {
  //       return true; // Include the item if the IDs match
  //     }
  //     return false;
  //   })
  // )?.zoomImage;
  let selectedDressImg = null;
  let selectedDressId = null;

  products.some((product) => {
    return product.colors.some((item) => {
      return selectedDressInfo.some((dressInfo) => {
        if (dressInfo.selectedDressId === item._id) {
          selectedDressImg = dressInfo.selectedDressImg;
          selectedDressId = dressInfo.selectedDressId;
          return true; // Include the item if the IDs match
        }
        return false;
      });
    });
  });

  if (selectedDressImg) {
    console.log("Selected Dress Img:", selectedDressImg);
    console.log("Selected Dress Id:", selectedDressId);
  } else {
    console.log("No matching dress found.");
  }

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
                                  src={product.colors[0].zoomImage}
                                  alt={product.title}
                                  height="100px"
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
                                className="logout"
                              >
                                add to cart
                              </button>
                            </td>

                            <td className="pro-remove">
                              <a
                                href="/"
                                onClick={(event) => {
                                  event.preventDefault(); // Prevent the default link behavior
                                  product.colors.forEach((color) => {
                                    const selectedDress =
                                      selectedDressInfo.find(
                                        (dress) =>
                                          color._id === dress.selectedDressId
                                      );

                                    if (selectedDress) {
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WishlistTable;
