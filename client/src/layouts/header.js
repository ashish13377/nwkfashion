import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BiHeart } from "react-icons/bi";
import { BiShoppingBag } from "react-icons/bi";
import { BiUser } from "react-icons/bi";

export default function Header() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const userId = useSelector((state) => state.cart.userId);
  const cartItemsCount = useSelector(
    (state) =>
      state?.cart?.products?.filter((product) => product?.userId === userId) // Filter products based on userId
  );

  const wishlistItemsCount = useSelector((state) =>
    state?.wishlist?.wishlists?.filter((product) => product?.userId === userId)
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
        <div
          className="header-bottom header-bottom-one header-sticky"
          style={{ paddingTop: "5px", paddingBottom: "5px" }}
        >
          <div className="container-fluid">
            <div className="row menu-center align-items-center justify-content-between">
              <div className="col ">
                {/* Logo Start */}
                <div className="header-logo">
                  <Link to="/">
                    <img src="assets/images/logo png.png" alt="logo" />
                  </Link>
                </div>
                {/* Logo End */}
              </div>
              <div className="col  order-lg-3">
                {/* Header Advance Search Start */}
                {!user ? (
                  <>
                    <div className="header-shop-links">
                      <div className="header-profile">
                        <Link to="/loginRegisterPage">
                          <BiUser size="30px" />{" "}
                        </Link>
                      </div>
                      <div className="header-wishlist">
                        <Link to="/loginRegisterPage">
                          <BiHeart size="30px" />{" "}
                          <span>{wishlistItemsCount.length}</span>
                        </Link>
                      </div>
                      <div className="header-mini-cart">
                        <Link to="/loginRegisterPage">
                          <BiShoppingBag size="30px" />{" "}
                          <span>{cartItemsCount.length}</span>
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="header-shop-links">
                    <div className="header-profile">
                      <Link to="/myAccountPage">
                        <BiUser size="30px" />{" "}
                      </Link>
                    </div>
                    <div className="header-wishlist">
                      <Link to="/wishlistPage">
                        <BiHeart size="30px" />{" "}
                        <span>{wishlistItemsCount.length}</span>
                      </Link>
                    </div>
                    <div className="header-mini-cart">
                      <Link to="/cart">
                        <BiShoppingBag size="30px" />{" "}
                        <span>{cartItemsCount.length}</span>
                      </Link>
                    </div>
                  </div>
                )}
                {/* Header Advance Search End */}
              </div>
              <div className="col  order-lg-2">
                <div className="main-menu">
                  <nav>
                    <ul>
                      <li className="active">
                        <Link to="/">My Classy Threads</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              {/* Mobile Menu */}
              <div className="mobile-menu order-4 d-block d-lg-none col"></div>
            </div>
          </div>
        </div>
        <div className="header-top header-top-one bg-theme-two">
          <div className="container-fluid">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <div className="main-menu-new">
                <nav>
                  <ul>
                    <li>
                      <Link to="/Gown">Gown</Link>
                    </li>
                    <li>
                      <Link to="/Lehenga">Lehenga</Link>
                    </li>
                    <li>
                      <Link to="/Suit">Suite</Link>
                    </li>
                    <li>
                      <Link to="/Cord Set">Cord Set</Link>
                    </li>
                    <li>
                      <Link to="/Palazzo Set">Palazzo Set</Link>
                    </li>
                    {/* <li>
                      <Link to="/Cotton Dresses">Cotton Dresses</Link>
                    </li> */}

                    {/* <li>
                        <a>Couple Dressess</a>
                        <ul className="sub-menu">
                          <li>
                            <Link to="/Gown">Gown</Link>
                          </li>
                          <li>
                            <Link to="/Kurtis">Kurtis, Tunics & Tops</Link>
                          </li>
                          <li>
                            <Link to="/Sarees">Sarees</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a>Lehengas</a>
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
                      <li>
                        <a>Salwar Kameez</a>
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
                      <li>
                        <a>Palazzo suits</a>
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
                      </li> */}

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

                    {/* <li>
                        <a href="contact.html">CONTACT</a>
                      </li> */}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Header BOttom End */}
      </div>
      {/* mobile view */}
      <div className="header-section-mobile section">
        <div className="header-bottom header-bottom-one header-sticky">
          <div className="container-fluid">
            <div className="row flex-row justify-content-evenly">
              <div className="header-logo">
                <Link Link to="/">
                  <img src="assets/images/logo png.png" alt="logo" />
                </Link>
              </div>
              <div className="col mt-11 mb-15">
                <Navbar collapseOnSelect expand="lg" bg="white" variant="light">
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                      <Nav.Link>
                        <Link to="/">My Classy Threads</Link>
                      </Nav.Link>
                      <Nav.Link>
                        <Link to="/Gown">Gown</Link>
                      </Nav.Link>
                      <Nav.Link>
                        <Link to="/Lehenga">Lehenga</Link>
                      </Nav.Link>
                      <Nav.Link>
                        <Link to="/Suit">Suite</Link>
                      </Nav.Link>
                      <Nav.Link>
                        <Link to="/Cord Set">Cord Set</Link>
                      </Nav.Link>
                      <Nav.Link>
                        <Link to="/Palazzo Set">Palazzo Set</Link>
                      </Nav.Link>
                      {/* <NavDropdown
                        title="Dropdown"
                        id="collasible-nav-dropdown"
                      >
                        <NavDropdown.Item href="#action/3.1">
                          Action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                          Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">
                          Something
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                          Separated link
                        </NavDropdown.Item>
                      </NavDropdown> */}
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </div>
              <div className="col order-2 order-lg-3">
                {/* Header Advance Search Start */}
                {!user ? (
                  <>
                    <div className="header-shop-links">
                      <div className="header-profile">
                        <Link to="/loginRegisterPage">
                          <BiUser size="30px" />{" "}
                        </Link>
                      </div>
                      <div className="header-wishlist">
                        <Link to="/loginRegisterPage">
                          <BiHeart size="30px" />{" "}
                          <span>{wishlistItemsCount.length}</span>
                        </Link>
                      </div>
                      <div className="header-mini-cart">
                        <Link to="/loginRegisterPage">
                          <BiShoppingBag size="30px" />{" "}
                          <span>{cartItemsCount.length}</span>
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="header-shop-links">
                    <div className="header-profile">
                      <Link to="/myAccountPage">
                        <BiUser size="30px" />{" "}
                      </Link>
                    </div>
                    <div className="header-wishlist">
                      <Link to="/wishlistPage">
                        <BiHeart size="30px" />{" "}
                        <span>{wishlistItemsCount.length}</span>
                      </Link>
                    </div>
                    <div className="header-mini-cart">
                      <Link to="/cart">
                        <BiShoppingBag size="30px" />{" "}
                        <span>{cartItemsCount.length}</span>
                      </Link>
                    </div>
                  </div>
                )}
                {/* Header Advance Search End */}
              </div>
            </div>
          </div>
        </div>
        {/* Header BOttom End */}
      </div>
      {/* Header Section End */}
    </div>
  );
}
