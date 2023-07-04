import React from "react";

const ShopLeftPart = () => {
  return (
    <div>
      <div className="sidebar">
        <h4 className="sidebar-title">Category</h4>
        <ul className="sidebar-list">
          <li>
            <a href="#">
              Shart <span className="num">18</span>
            </a>
          </li>
          <li>
            <a href="#">
              Pants <span className="num">09</span>
            </a>
          </li>
          <li>
            <a href="#">
              T-Shart <span className="num">05</span>
            </a>
          </li>
          <li>
            <a href="#">
              Tops <span className="num">03</span>
            </a>
          </li>
          <li>
            <a href="#">
              Kid's Clothes <span className="num">15</span>
            </a>
          </li>
          <li>
            <a href="#">
              Watch <span className="num">07</span>
            </a>
          </li>
          <li>
            <a href="#">
              Accessories <span className="num">02</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="sidebar">
        <h4 className="sidebar-title">colors</h4>
        <ul className="sidebar-list">
          <li>
            <a href="#">
              <span className="color" style={{ backgroundColor: "#000000" }} />{" "}
              Black
            </a>
          </li>
          <li>
            <a href="#">
              <span className="color" style={{ backgroundColor: "#FF0000" }} />{" "}
              Red
            </a>
          </li>
          <li>
            <a href="#">
              <span className="color" style={{ backgroundColor: "#0000FF" }} />{" "}
              Blue
            </a>
          </li>
          <li>
            <a href="#">
              <span className="color" style={{ backgroundColor: "#28901D" }} />{" "}
              Green
            </a>
          </li>
          <li>
            <a href="#">
              <span className="color" style={{ backgroundColor: "#FF6801" }} />{" "}
              Orange
            </a>
          </li>
        </ul>
      </div>
      <div className="sidebar">
        <h4 className="sidebar-title">Popular Product</h4>
        <div className="sidebar-product-wrap">
          <div className="sidebar-product">
            <a href="single-product.html" className="image">
              <img src="assets/images/product/product-1.jpg" alt />
            </a>
            <div className="content">
              <a href="single-product.html" className="title">
                Tmart Baby Dress
              </a>
              <span className="price">
                $25 <span className="old">$38</span>
              </span>
              <div className="ratting">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-o" />
              </div>
            </div>
          </div>
          <div className="sidebar-product">
            <a href="single-product.html" className="image">
              <img src="assets/images/product/product-2.jpg" alt />
            </a>
            <div className="content">
              <a href="single-product.html" className="title">
                Jumpsuit Outfits
              </a>
              <span className="price">
                $09 <span className="old">$21</span>
              </span>
              <div className="ratting">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-o" />
              </div>
            </div>
          </div>
          <div className="sidebar-product">
            <a href="single-product.html" className="image">
              <img src="assets/images/product/product-3.jpg" alt />
            </a>
            <div className="content">
              <a href="single-product.html" className="title">
                Smart Shirt
              </a>
              <span className="price">
                $18 <span className="old">$29</span>
              </span>
              <div className="ratting">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-o" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar">
        <h3 className="sidebar-title">Tags</h3>
        <ul className="sidebar-tag">
          <li>
            <a href="#">New</a>
          </li>
          <li>
            <a href="#">brand</a>
          </li>
          <li>
            <a href="#">black</a>
          </li>
          <li>
            <a href="#">white</a>
          </li>
          <li>
            <a href="#">chire</a>
          </li>
          <li>
            <a href="#">table</a>
          </li>
          <li>
            <a href="#">Lorem</a>
          </li>
          <li>
            <a href="#">ipsum</a>
          </li>
          <li>
            <a href="#">dolor</a>
          </li>
          <li>
            <a href="#">sit</a>
          </li>
          <li>
            <a href="#">amet</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShopLeftPart;
