import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const userId = useSelector((state) => state.cart.userId);
  const cartItemsCount = useSelector(
    (state) =>
      state.cart.products.filter((product) => product.userId === userId) // Filter products based on userId
  );
  const wishlistItemsCount = useSelector(
    (state) => state.wishlist.wishlists.length
  );
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUser(data);
    // if (!data) {
    //   navigate("/loginRegisterPage");
    // }
  }, []);
  console.log(user);
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

              {!user ? (
                <div className="col mt-10 mb-10">
                  {/* Header Shop Links Start */}
                  <div className="header-top-right">
                    <p>
                      <Link link to="/loginRegisterPage">
                        Register | Login
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
                {!user ? (
                  <></>
                ) : (
                  <div className="header-shop-links">
                    <div className="header-wishlist">
                      <Link to="/wishlistPage">
                        <img
                          src="assets/images/icons/wishlist.png"
                          alt="Wishlist"
                        />{" "}
                        <span>{wishlistItemsCount}</span>
                      </Link>
                    </div>
                    <div className="header-mini-cart">
                      <Link to="/cart">
                        <img src="assets/images/icons/cart.png" alt="Cart" />
                        <span>{cartItemsCount.length}</span>
                      </Link>
                    </div>
                  </div>
                )}
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
