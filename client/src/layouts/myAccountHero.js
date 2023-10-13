import React from "react";
import { Link } from "react-router-dom";
const myAccountHero = () => {
  return (
    <div>
      <div
        className="page-banner-section section"
        // style={{ backgroundImage: "url(assets/images/hero/hero-1.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="page-banner-content col">
              <h1>My Account</h1>
              <ul className="page-breadcrumb">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <a>My Account</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default myAccountHero;
