import React from "react";

const SingleProductDescription = ({ productDetails }) => {
  console.log(productDetails);
  const product = {
    title: "Lorem epsum",
    price: "$",
    description:
      "enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia res eos qui ratione voluptatem sequi Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora inform",
    availability: "In Stock",
    quantity: 1,
    colors: ["#ff502e", "#fff600", "#1b2436"],
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
    zoomImage: "assets/images/product/product-zoom-1.jpg",
    image: "assets/images/product/product-big-1.jpg",
  };

  return (
    <div className="page-section section section-padding">
      <div className="container">
        <div className="row row-30 mbn-50">
          <div className="col-12">
            <div className="row row-20 mb-10">
              <div className="col-lg-6 col-12 mb-40">
                <div className="pro-large-img mb-10 fix easyzoom easyzoom--overlay easyzoom--with-thumbnails">
                  <a href={product.zoomImage}>
                    <img src={product.image} alt="" />
                  </a>
                </div>
              </div>
              <div className="col-lg-6 col-12 mb-40">
                <div className="single-product-content">
                  <div className="head">
                    <div className="head-left">
                      <h3 className="title">{product.title}</h3>
                      <div className="ratting">
                        {Array.from({ length: product.rating }, (_, index) => (
                          <i key={index} className="fa fa-star" />
                        ))}
                        {Array.from(
                          { length: 5 - product.rating },
                          (_, index) => (
                            <i key={index} className="fa fa-star-o" />
                          )
                        )}
                      </div>
                    </div>
                    <div className="head-right">
                      <span className="price">{product.price}</span>
                    </div>
                  </div>
                  <div className="description">
                    <p>{product.description}</p>
                  </div>
                  <span className="availability">
                    Availability: <span>{product.availability}</span>
                  </span>
                  <div className="quantity-colors">
                    <div className="quantity">
                      <h5>Quantity:</h5>
                      <div className="pro-qty">
                        <input type="text" defaultValue={product.quantity} />
                      </div>
                    </div>
                    <div className="colors">
                      <h5>Color:</h5>
                      <div className="color-options">
                        {product.colors.map((color, index) => (
                          <button
                            key={index}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="actions">
                    <button>
                      <i className="ti-shopping-cart" />
                      <span>ADD TO CART</span>
                    </button>
                    <button className="box" data-tooltip="Compare">
                      <i className="ti-control-shuffle" />
                    </button>
                    <button className="box" data-tooltip="Wishlist">
                      <i className="ti-heart" />
                    </button>
                  </div>
                  <div className="tags">
                    <h5>Tags:</h5>
                    {product.tags.map((tag, index) => (
                      <a key={index} href="#">
                        {tag}
                      </a>
                    ))}
                  </div>
                  <div className="share">
                    <h5>Share: </h5>
                    {product.socialMedia.map((media, index) => (
                      <a key={index} href="#">
                        <i className={media.icon} />
                      </a>
                    ))}
                  </div>
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
                <div className="pro-info-tab tab-pane active" id="more-info">
                  <p>
                    Fashion has been creating well-designed collections since
                    2010. The brand offers feminine designs delivering stylish
                    separates and statement dresses which have since evolved
                    into a full ready-to-wear collection in which every item is
                    a vital part of a woman's wardrobe. The result? Cool, easy,
                    chic looks with youthful elegance and unmistakable signature
                    style. All the beautiful pieces are made in Italy and
                    manufactured with the greatest attention. Now Fashion
                    extends to a range of accessories including shoes, hats,
                    belts and more!
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
  );
};

export default SingleProductDescription;
