import React from "react";

const singleProductDescription = () => {
  return (
    <div>
      <div className="page-section section section-padding">
        <div className="container">
          <div className="row row-30 mbn-50">
            <div className="col-12">
              <div className="row row-20 mb-10">
                <div className="col-lg-6 col-12 mb-40">
                  <div className="pro-large-img mb-10 fix easyzoom easyzoom--overlay easyzoom--with-thumbnails">
                    <a href="assets/images/product/product-zoom-1.jpg">
                      <img src="assets/images/product/product-big-1.jpg" alt />
                    </a>
                  </div>
                </div>
                <div className="col-lg-6 col-12 mb-40">
                  <div className="single-product-content">
                    <div className="head">
                      <div className="head-left">
                        <h3 className="title">Lorem epsum</h3>
                        <div className="ratting">
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star-half-o" />
                          <i className="fa fa-star-o" />
                        </div>
                      </div>
                      <div className="head-right">
                        <span className="price">$</span>
                      </div>
                    </div>
                    <div className="description">
                      <p>
                        enim ipsam voluptatem quia voluptas sit aspernatur aut
                        odit aut fugit, sed quia res eos qui ratione voluptatem
                        sequi Neque porro quisquam est, qui dolorem ipsum quia
                        dolor sit amet, consectetur, adipisci velit, sed quia
                        non numquam eius modi tempora inform
                      </p>
                    </div>
                    <span className="availability">
                      Availability: <span>In Stock</span>
                    </span>
                    <div className="quantity-colors">
                      <div className="quantity">
                        <h5>Quantity:</h5>
                        <div className="pro-qty">
                          <input type="text" defaultValue={1} />
                        </div>
                      </div>
                      <div className="colors">
                        <h5>Color:</h5>
                        <div className="color-options">
                          <button style={{ backgroundColor: "#ff502e" }} />
                          <button style={{ backgroundColor: "#fff600" }} />
                          <button style={{ backgroundColor: "#1b2436" }} />
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
                      <a href="#">Electronic</a>
                      <a href="#">Smartphone</a>
                      <a href="#">Phone</a>
                      <a href="#">Charger</a>
                      <a href="#">Powerbank</a>
                    </div>
                    <div className="share">
                      <h5>Share: </h5>
                      <a href="#">
                        <i className="fa fa-facebook" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram" />
                      </a>
                      <a href="#">
                        <i className="fa fa-google-plus" />
                      </a>
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
                      into a full ready-to-wear collection in which every item
                      is a vital part of a woman's wardrobe. The result? Cool,
                      easy, chic looks with youthful elegance and unmistakable
                      signature style. All the beautiful pieces are made in
                      Italy and manufactured with the greatest attention. Now
                      Fashion extends to a range of accessories including shoes,
                      hats, belts and more!
                    </p>
                  </div>
                  <div className="pro-info-tab tab-pane" id="data-sheet">
                    <table className="table-data-sheet">
                      <tbody>
                        <tr className="odd">
                          <td>Compositions</td>
                          <td>Cotton</td>
                        </tr>
                        <tr className="even">
                          <td>Styles</td>
                          <td>Casual</td>
                        </tr>
                        <tr className="odd">
                          <td>Properties</td>
                          <td>Short Sleeve</td>
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
    </div>
  );
};

export default singleProductDescription;
