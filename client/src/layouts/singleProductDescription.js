import React, { useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlice";
import { addToWishlist } from "../utils/wishlistSlice";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        position: "relative",
        top: "50%",
        left: "50%",
      }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

const SingleProductDescription = ({ productDetails, loading }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productDetails) => {
    dispatch(addToCart(productDetails));
    console.log(productDetails);
  };
  const handleAddToWishlist = (productDetails) => {
    dispatch(addToWishlist(productDetails));
    console.log(productDetails);
  };

  console.log(productDetails);

  const product = {
    title: "Lorem epsum",
    price: "$",
    description:
      "enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia res eos qui ratione voluptatem sequi Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora inform",
    availability: "In Stock",
    quantity: 1,
    colors: [
      {
        color: "#2e3246",
        zoomImage: "assets/images/product/product-zoom-black.jpeg",
      },
      {
        color: "#0d6669",
        zoomImage: "assets/images/product/product-zoom-blue.jpeg",
      },
      {
        color: "#38132d",
        zoomImage: "assets/images/product/product-zoom-violet.jpeg",
      },
    ],
    tags: ["Electronic", "Smartphone", "Phone", "Charger", "Powerbank"],
    socialMedia: [
      { name: "Facebook", icon: "fa fa-facebook" },
      { name: "Twitter", icon: "fa fa-twitter" },
      { name: "Instagram", icon: "fa fa-instagram" },
      { name: "Google+", icon: "fa fa-google-plus" },
    ],
    compositions: "Cotton",
    styles: "Casual",
    properties: "Short Sleeve",
    rating: 4,
  };
  const [selectedColor, setSelectedColor] = useState(product.colors[0].color);
  console.log(selectedColor);
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {" "}
          <div className="page-section section section-padding">
            <div className="container">
              <div className="row row-30 mbn-50">
                <div className="col-12">
                  <div className="row row-20 mb-10">
                    <div className="col-lg-6 col-12 mb-40">
                      <div className="pro-large-img mb-10 fix easyzoom easyzoom--overlay easyzoom--with-thumbnails">
                        <ReactImageMagnify
                          {...{
                            smallImage: {
                              alt: "",
                              isFluidWidth: true,
                              src: product.colors.find(
                                (item) => item.color === selectedColor
                              )?.zoomImage,
                            },
                            largeImage: {
                              src: product.colors.find(
                                (item) => item.color === selectedColor
                              )?.zoomImage,
                              width: 1200,
                              height: 1800,
                            },
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-12 mb-40">
                      <div className="single-product-content">
                        <div className="head">
                          <div className="head-left">
                            <h3 className="title">{productDetails.title}</h3>
                            <div className="ratting">
                              {Array.from(
                                { length: productDetails.rating },
                                (_, index) => (
                                  <i key={index} className="fa fa-star" />
                                )
                              )}
                              {Array.from(
                                { length: 5 - productDetails.rating },
                                (_, index) => (
                                  <i key={index} className="fa fa-star-o" />
                                )
                              )}
                            </div>
                          </div>
                          <div className="head-right">
                            <span className="price">
                              {productDetails.price}
                            </span>
                          </div>
                        </div>
                        <div className="description">
                          <p>{productDetails.description}</p>
                        </div>
                        <span className="availability">
                          Availability:{" "}
                          <span>{productDetails.availability}</span>
                        </span>
                        <div className="quantity-colors">
                          <div className="quantity">
                            <h5>Quantity:</h5>
                            <div className="pro-qty">
                              <input
                                type="text"
                                defaultValue={productDetails.quantity}
                              />
                            </div>
                          </div>
                          <div className="colors">
                            <h5>Color:</h5>
                            <div className="color-options">
                              {product.colors.map((colorObj, index) => (
                                <button
                                  key={index}
                                  style={{ backgroundColor: colorObj.color }}
                                  onClick={() =>
                                    handleColorClick(colorObj.color)
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="actions">
                          <button
                            onClick={() => handleAddToCart(productDetails)}
                          >
                            <i className="ti-shopping-cart" />
                            <span>ADD TO CART</span>
                          </button>

                          <button
                            onClick={() => handleAddToWishlist(productDetails)}
                            className="box"
                            data-tooltip="Wishlist"
                          >
                            <i className="ti-heart" />
                          </button>
                        </div>

                        {/* <div className="share">
                          <h5>Share: </h5>
                          {productDetails.socialMedia.map((media, index) => (
                            <a key={index} href="#">
                              <i className={media.icon} />
                            </a>
                          ))}
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="row mb-50">
                    {/* Nav tabs */}
                    <div className="col-12">
                      <ul className="pro-info-tab-list section nav">
                        <li>
                          <a
                            className="active"
                            href="#more-info"
                            data-bs-toggle="tab"
                          >
                            More info
                          </a>
                        </li>
                        <li>
                          <a href="#data-sheet" data-bs-toggle="tab">
                            Data sheet
                          </a>
                        </li>
                        <li>
                          <a href="#reviews" data-bs-toggle="tab">
                            Reviews
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* Tab panes */}
                    <div className="tab-content col-12">
                      <div
                        className="pro-info-tab tab-pane active"
                        id="more-info"
                      >
                        <p>
                          Fashion has been creating well-designed collections
                          since 2010. The brand offers feminine designs
                          delivering stylish separates and statement dresses
                          which have since evolved into a full ready-to-wear
                          collection in which every item is a vital part of a
                          woman's wardrobe. The result? Cool, easy, chic looks
                          with youthful elegance and unmistakable signature
                          style. All the beautiful pieces are made in Italy and
                          manufactured with the greatest attention. Now Fashion
                          extends to a range of accessories including shoes,
                          hats, belts and more!
                        </p>
                        ...
                      </div>
                      <div className="pro-info-tab tab-pane" id="data-sheet">
                        <table className="table-data-sheet">
                          <tbody>
                            <tr className="odd">
                              <td>Compositions</td>
                              <td>{product.compositions}</td>
                            </tr>
                            <tr className="even">
                              <td>Styles</td>
                              <td>{product.styles}</td>
                            </tr>
                            <tr className="odd">
                              <td>Properties</td>
                              <td>{product.properties}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="pro-info-tab tab-pane" id="reviews">
                        <a href="#">Be the first to write your review!</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleProductDescription;
