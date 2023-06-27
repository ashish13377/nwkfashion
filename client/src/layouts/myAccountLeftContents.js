import React from "react";

const myAccountLeftContents = () => {
  return (
    <div>
      <div className="myaccount-tab-menu nav" role="tablist">
        <a href="#dashboad" className="active" data-bs-toggle="tab">
          <i className="fa fa-dashboard" />
          Dashboard
        </a>
        <a href="#orders" data-bs-toggle="tab">
          <i className="fa fa-cart-arrow-down" /> Orders
        </a>
        <a href="#download" data-bs-toggle="tab">
          <i className="fa fa-cloud-download" /> Download
        </a>
        <a href="#payment-method" data-bs-toggle="tab">
          <i className="fa fa-credit-card" /> Payment Method
        </a>
        <a href="#address-edit" data-bs-toggle="tab">
          <i className="fa fa-map-marker" /> address
        </a>
        <a href="#account-info" data-bs-toggle="tab">
          <i className="fa fa-user" /> Account Details
        </a>
        <a href="login-register.html">
          <i className="fa fa-sign-out" /> Logout
        </a>
      </div>
    </div>
  );
};

export default myAccountLeftContents;
