import React, { useState, useEffect } from "react";
import ReactImageMagnify from "react-image-magnify";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlice";
import { addToWishlist } from "../utils/wishlistSlice";
import { updateSelectedDress } from "../utils/selectedDressSlice";
import ContentLoader from "react-content-loader";
import { serverAPILocal } from "../App";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
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

const ShimmerEffect = () => (
  <ContentLoader
    speed={2}
    width={800}
    height={430}
    viewBox="0 0 800 430"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="500" y="91" rx="3" ry="3" width="158" height="11" />
    <rect x="0" y="90" rx="0" ry="0" width="416" height="470" />
    <rect x="176" y="158" rx="0" ry="0" width="7" height="13" />
    <rect x="500" y="139" rx="0" ry="0" width="291" height="8" />
    <rect x="152" y="69" rx="0" ry="0" width="2" height="0" />
    <rect x="500" y="167" rx="0" ry="0" width="486" height="8" />
    <rect x="500" y="201" rx="0" ry="0" width="486" height="8" />
    <rect x="500" y="234" rx="0" ry="0" width="486" height="8" />
    <rect x="500" y="267" rx="0" ry="0" width="486" height="8" />
    <rect x="500" y="300" rx="0" ry="0" width="486" height="8" />
  </ContentLoader>
);

const SingleProductDescription = ({ productDetails, loading, user }) => {
  console.log("user:::", user);
  const dispatch = useDispatch();

  const handleAddToCart = (productDetails) => {
    dispatch(addToCart(productDetails));
    dispatch(updateSelectedDress({ selectedDressImg, selectedDressId }));
    console.log(productDetails);
  };
  const handleAddToWishlist = (productDetails) => {
    dispatch(addToWishlist(productDetails));
    dispatch(updateSelectedDress({ selectedDressImg, selectedDressId }));
    console.log(productDetails);
  };

  console.log(productDetails);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    if (productDetails?.colors?.length > 0) {
      setSelectedColor(productDetails?.colors[0]?.color);
    }
  }, [productDetails]);

  console.log(productDetails?.colors[0]?.color);
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const selectedDressImg = productDetails?.colors?.find(
    (item) => item.color === selectedColor
  )?.zoomImage;
  const selectedDressId = productDetails?.colors?.find(
    (item) => item.color === selectedColor
  )?._id;

  //

  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const { productId } = useParams();

  // Function to fetch reviews and update the state
  const fetchReviews = () => {
    axios
      .get(`${serverAPILocal}/products/${productId}/reviews`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  };

  // Function to post a new review
  const postReview = () => {
    const newReview = { text: reviewText, user: user.name };
    axios
      .post(`${serverAPILocal}/products/${productId}/reviews`, newReview)
      .then((response) => {
        // Append the new review to the existing reviews
        setReviews([...reviews, response.data]);
        setReviewText(""); // Clear the input fi eld
      })
      .catch((error) => {
        console.error("Error posting review:", error);
      });
  };

  useEffect(() => {
    // Fetch reviews when the component mounts
    fetchReviews();
  }, []); // Empty dependency array ensures this effect runs once
  console.log("reviews", reviews);
  return (
    <div>
      {loading ? (
        <>
          <div className="shimmerPC">
            <ShimmerEffect />
          </div>
          <div className="shimmerMobile">
            <LoadingSpinner />
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="page-section section section-padding">
            <div className="container">
              <div className="row row-30 mbn-50">
                <div className="col-12">
                  <div className="row row-20 mb-10">
                    <div className="col-lg-6 col-12 mb-40">
                      {/* className="pro-large-img mb-10 fix easyzoom easyzoom--overlay easyzoom--with-thumbnails" */}
                      <div>
                        <ReactImageMagnify
                          {...{
                            smallImage: {
                              alt: "",
                              isFluidWidth: true,
                              src: productDetails?.colors.find(
                                (item) => item.color === selectedColor
                              )?.zoomImage,
                            },
                            largeImage: {
                              src: productDetails?.colors.find(
                                (item) => item.color === selectedColor
                              )?.zoomImage,
                              width: 1200,
                              height: 1800,
                            },
                            isHintEnabled: true,
                            enlargedImagePosition: "over",
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
                              &#8377;{productDetails.price}
                            </span>
                          </div>
                        </div>

                        <div className="description">
                          {productDetails?.description
                            .split(",")
                            .map((item, index) => (
                              <p key={index}>{item}</p>
                            ))}
                        </div>
                        <span className="availability">
                          Availability:{" "}
                          <span>{productDetails.availability}</span>
                        </span>
                        <div className="quantity-colors">
                          {/* <div className="quantity">
                            <h5>Quantity:</h5>
                            <div className="pro-qty">
                              <input
                                type="text"
                                defaultValue={productDetails.quantity}
                              />
                            </div>
                          </div> */}
                          <div className="colors">
                            <h5>Color:</h5>
                            <div className="color-options">
                              {productDetails?.colors.map((colorObj, index) => (
                                <button
                                  key={index}
                                  style={{
                                    backgroundColor: colorObj.color,
                                    border:
                                      selectedColor === colorObj.color
                                        ? "2px solid #ff0000"
                                        : "none",
                                  }}
                                  onClick={() =>
                                    handleColorClick(colorObj.color)
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        {user ? (
                          <div className="actions">
                            <button
                              onClick={() => handleAddToCart(productDetails)}
                            >
                              <i className="ti-shopping-cart" />
                              <span>ADD TO CART</span>
                            </button>

                            <button
                              onClick={() =>
                                handleAddToWishlist(productDetails)
                              }
                              className="box"
                              data-tooltip="Wishlist"
                            >
                              <i className="ti-heart" />
                            </button>
                          </div>
                        ) : (
                          <div className="actions">
                            <button>
                              <i className="ti-shopping-cart" />
                              <span>Login/Signup</span>
                            </button>
                          </div>
                        )}

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
                        <b> Wash & Care Instructions </b>
                        <ul>
                          <li>Do not bleach.</li>
                          <li>Cool Iron.</li>
                          <li>Do not tumble dry Delicate dry clean.</li>
                          <li>
                            {" "}
                            Do not wring Professional wash with water Hang For
                            drying in shade.
                          </li>
                        </ul>
                      </div>

                      <div>
                        <div className="pro-info-tab tab-pane" id="reviews">
                          {reviews.length === 0 ? (
                            <p>Be the first to write your review!</p>
                          ) : (
                            <ul>
                              {Array.isArray(reviews).reviews?.map((review) => (
                                <ul>
                                  {" "}
                                  <li>
                                    <b>{review?.user}</b>
                                    <li
                                      key={review?._id}
                                      style={{
                                        paddingLeft: "5px",
                                        position: "relative",
                                        bottom: "5px",
                                      }}
                                    >
                                      {review?.text}
                                    </li>
                                  </li>
                                </ul>
                              ))}
                            </ul>
                          )}
                          {user ? (
                            <form>
                              <input
                                type="text"
                                placeholder="Write your review"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                style={{
                                  border: "1px solid #757575",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  paddingLeft: "4px",
                                }}
                              />
                              <button
                                type="button"
                                onClick={postReview}
                                style={{
                                  border: "1px solid #757575",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  marginLeft: "4px",
                                }}
                              >
                                Submit Review
                              </button>
                            </form>
                          ) : (
                            <></>
                          )}
                        </div>
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
