import React from "react";
import { Link } from "react-router-dom";

export default function footer() {
  return (
    <div>
      {" "}
      <div>
        {/* Footer Top Section Start */}
        <div className="footer-top-section section bg-theme-two-light footer-section-padding">
          <div className="container">
            <div className="row mbn-40">
              <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
                <h4 className="title">CONTACT US</h4>

                <p>
                  <b>Operational Address :</b> NWK Fashion Pvt Ltd #2903, 1st &
                  2nd floor, Madegowda Circle, Rajiv Nagar, Mysore, Karnataka -
                  570019
                </p>

                <p>
                  <a href="tel: +91-984598872">
                    {" "}
                    <b>Contact:</b>:+91-984598872
                  </a>
                  <p>( 12 PM IST to 12 AM IST)</p>
                </p>
                <p>
                  <a
                    href="mailto:customercare@myclassythreads.com"
                    style={{ lineHeight: "18px" }}
                  >
                    {" "}
                    <b>Email :</b> customercare@
                    <br />
                    myclassythreads.com
                  </a>
                </p>
              </div>
              <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
                <h4 className="title">PRODUCTS</h4>
                <ul>
                  <li>
                    <a href="#">New Arrivals</a>
                  </li>

                  <li>
                    <a href="#">Best Deals</a>
                  </li>
                  <li>
                    <a href="#">On Sale Products</a>
                  </li>
                  <li>
                    <a href="#">Best Seller</a>
                  </li>
                </ul>
              </div>
              <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
                <h4 className="title">INFORMATION</h4>
                <ul>
                  <li>
                    <Link to="/terms">Terms of service & conditions</Link>
                  </li>
                  <li>
                    <Link to="/aboutUs">About us</Link>
                  </li>
                  <li>
                    <Link to="/faq">FAQ</Link>
                  </li>

                  <li>
                    <Link to="/return">Return/Refund Process</Link>
                  </li>

                  <li>
                    <Link to="/shipping">Shipping &amp; Handling</Link>
                  </li>
                  <li>
                    <Link to="/cancellation">Cancellation Policy</Link>
                  </li>
                  <li>
                    <Link to="/privacy">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
              <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
                <h5 className="title">FOLLOW US</h5>
                <p className="footer-social">
                  <img
                    style={{ height: "33px" }}
                    src="assets/images/fb-logo.png"
                    alt="fb-logo"
                  />
                  <a href="#"> </a> -{" "}
                  <Link to="https://instagram.com/mct_fashions?igshid=MzRlODBiNWFlZA==">
                    <img
                      style={{ height: "33px" }}
                      src="assets/images/insta-logo.png"
                      alt="insta-logo"
                    />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Top Section End */}
        {/* Footer Bottom Section Start */}
        <div className="footer-bottom-section section bg-theme-two pt-8 pb-8">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <p className="footer-copyright">
                  ©️ 2023 . <Link to="/">www.myclassythreads.com</Link>, NWK
                  Fashion Pvt Ltd entity . All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Bottom Section End */}
      </div>
    </div>
  );
}
