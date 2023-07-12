import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const cartItemsCount = useSelector((state) => state.cart.length);

  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("user"));
  //   setUser(data);
  //   if (!data) {
  //     navigate("/loginRegisterPage");
  //   }
  // }, []);

  return (
    <div>
      {" "}
      {/* Header Section Start */}
      <div className="header-section section">
        {/* Header Top Start */}
        <div className="header-top header-top-one bg-theme-two">
          <div className="container-fluid">
            <div className="row align-items-center justify-content-center">
              <div className="col mt-10 mb-10 d-none d-md-flex">
                {/* Header Top Left Start */}
                <div className="header-top-left">
                  <p>NWK FASHION</p>
                </div>
                {/* Header Top Left End */}
              </div>
              <div className="col mt-10 mb-10">
                {/* Header Language Currency Start */}
                <ul className="header-lan-curr">
                  <li>
                    <a href="#">eng</a>
                    <ul>
                      <li>
                        <a href="#">english</a>
                      </li>
                      <li>
                        <a href="#">spanish</a>
                      </li>
                      <li>
                        <a href="#">france</a>
                      </li>
                      <li>
                        <a href="#">russian</a>
                      </li>
                      <li>
                        <a href="#">chinese</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">$usd</a>
                    <ul>
                      <li>
                        <a href="#">pound</a>
                      </li>
                      <li>
                        <a href="#">dollar</a>
                      </li>
                      <li>
                        <a href="#">euro</a>
                      </li>
                      <li>
                        <a href="#">yen</a>
                      </li>
                    </ul>
                  </li>
                </ul>
                {/* Header Language Currency End */}
              </div>
              {!user ? (
                <div className="col mt-10 mb-10">
                  {/* Header Shop Links Start */}
                  <div className="header-top-right">
                    <p>
                      <Link link to="/myAccountPage">
                        My Account
                      </Link>
                    </p>
                    <p>
                      <Link link to="/loginRegisterPage">
                        Register
                      </Link>
                      <Link link to="/loginRegisterPage">
                        Login
                      </Link>
                    </p>
                  </div>
                  {/* Header Shop Links End */}
                </div>
              ) : (
                <div className="col mt-10 mb-10">
                  {/* Header Shop Links Start */}
                  <div className="header-top-right">
                    <p>
                      <Link link to="/myAccountPage">
                        Hello, {user.username}
                      </Link>
                    </p>
                  </div>
                  {/* Header Shop Links End */}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Header Top End */}
        {/* Header Bottom Start */}
        <div className="header-bottom header-bottom-one header-sticky">
          <div className="container-fluid">
            <div className="row menu-center align-items-center justify-content-between">
              <div className="col mt-15 mb-15">
                {/* Logo Start */}
                <div className="header-logo">
                  <Link Link to="/">
                    <img src="" alt="logo" />
                  </Link>
                </div>
                {/* Logo End */}
              </div>
              <div className="col order-2 order-lg-3">
                {/* Header Advance Search Start */}
                <div className="header-shop-links">
                  <div className="header-search">
                    <button className="search-toggle">
                      <img
                        src="assets/images/icons/search.png"
                        alt="Search Toggle"
                      />
                      <img
                        className="toggle-close"
                        src="assets/images/icons/close.png"
                        alt="Search Toggle"
                      />
                    </button>
                    <div className="header-search-wrap">
                      <form action="#">
                        <input type="text" placeholder="Type and hit enter" />
                        <button>
                          <img
                            src="assets/images/icons/search.png"
                            alt="Search"
                          />
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="header-wishlist">
                    <a href="wishlist.html">
                      <img
                        src="assets/images/icons/wishlist.png"
                        alt="Wishlist"
                      />{" "}
                      <span>02</span>
                    </a>
                  </div>
                  <div className="header-mini-cart">
                    <Link to="/cart">
                      <img src="assets/images/icons/cart.png" alt="Cart" />
                      <span>{cartItemsCount}</span>
                    </Link>
                  </div>
                </div>
                {/* Header Advance Search End */}
              </div>
              <div className="col order-3 order-lg-2">
                <div className="main-menu">
                  <nav>
                    <ul>
                      <li className="active">
                        <Link to="/">HOME</Link>
                      </li>
                      <li>
                        <a href="shop.html">SHOP</a>
                        <ul className="sub-menu">
                          <li>
                            <Link to="/Kurtas">Kurtas & Suits</Link>
                          </li>
                          <li>
                            <Link to="/Kurtis">Kurtis, Tunics & Tops</Link>
                          </li>
                          <li>
                            <Link to="/Sarees">Sarees</Link>
                          </li>
                          <li>
                            <Link to="/Ethnic">Ethnic Wear</Link>
                          </li>
                          <li>
                            <Link to="/Leggings">
                              Leggings, Salwars & Churidars
                            </Link>
                          </li>
                          <li>
                            <Link to="/Skirts">Skirts & Palazzos</Link>
                          </li>
                        </ul>
                      </li>
                      {/* <li>
                        <a href="#">PAGES</a>
                        <ul className="sub-menu">
                          <li>
                            <a href="cart.html">Cart</a>
                          </li>
                          <li>
                            <a href="checkout.html">Checkout</a>
                          </li>
                          <li>
                            <a href="login-register.html">
                              Login &amp; Register
                            </a>
                          </li>
                          <li>
                            <a href="my-account.html">My Account</a>
                          </li>
                          <li>
                            <a href="wishlist.html">Wishlist</a>
                          </li>
                          <li>
                            <a href="404.html">404 Error</a>
                          </li>
                        </ul>
                      </li> */}

                      <li>
                        <a href="contact.html">CONTACT</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              {/* Mobile Menu */}
              <div className="mobile-menu order-4 d-block d-lg-none col" />
            </div>
          </div>
        </div>
        {/* Header BOttom End */}
      </div>
      {/* Header Section End */}
    </div>
  );
}
