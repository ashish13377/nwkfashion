import React, { useState } from "react";

const BillingAddress = ({ formData, onFormDataChange }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onFormDataChange(name, value);
  };
  return (
    <div className="col-lg-7">
      {/* Address */}
      <div id="billing-form" className="mb-20">
        <h4 className="checkout-title">Address</h4>
        <div className="row">
          <div className="col-md-6 col-12 mb-5">
            <label>First Name*</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="First Name"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 col-12 mb-5">
            <label>Last Name*</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Last Name"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 col-12 mb-5">
            <label>Email Address*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email Address"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 col-12 mb-5">
            <label>Phone no*</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              placeholder="Phone number"
              onChange={handleChange}
            />
          </div>

          <div className="col-12 mb-5">
            <label>Address*</label>
            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              placeholder="Address line 1"
              onChange={handleChange}
            />
            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              placeholder="Address line 2"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 col-12 mb-5">
            <label>Country*</label>
            <select
              className="nice-select"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option>Bangladesh</option>
              <option>China</option>
              <option>country</option>
              <option>India</option>
              <option>Japan</option>
            </select>
          </div>
          <div className="col-md-6 col-12 mb-5">
            <label>Town/City*</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              placeholder="Town/City"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 col-12 mb-5">
            <label>State*</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              placeholder="State"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 col-12 mb-5">
            <label>Zip Code*</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              placeholder="Zip Code"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingAddress;
