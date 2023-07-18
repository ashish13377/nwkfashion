import React, { useState } from "react";

const PaymentMethod = ({
  formData,
  products,
  shippingCost,
  calculateSubtotal,
  calculateTotal,
}) => {
  console.log(formData);
  console.log(products);
  console.log(shippingCost);
  console.log(calculateSubtotal);
  console.log(calculateTotal);
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };
  console.log(selectedMethod);

  const handlePlaceOrder = () => {
    // Perform place order logic here
    console.log("Place order clicked");
  };

  return (
    <div>
      <div className="col-12 mb-40">
        <h4 className="checkout-title">Payment Method</h4>
        <div className="checkout-payment-method">
          <div className="single-method">
            <input
              type="radio"
              id="payment_bank"
              name="payment-method"
              value="bank"
              checked={selectedMethod === "bank"}
              onChange={handleMethodChange}
            />
            <label htmlFor="payment_bank">Direct Bank Transfer</label>
            <p data-method="bank">
              Please send a Check to Store name with Store Street, Store Town,
              Store State, Store Postcode, Store Country.
            </p>
          </div>
          <div className="single-method">
            <input
              type="radio"
              id="payment_cash"
              name="payment-method"
              value="cash"
              checked={selectedMethod === "cash"}
              onChange={handleMethodChange}
            />
            <label htmlFor="payment_cash">Cash on Delivery</label>
            <p data-method="cash">
              Please send a Check to Store name with Store Street, Store Town,
              Store State, Store Postcode, Store Country.
            </p>
          </div>
          <div className="single-method">
            <input
              type="radio"
              id="payment_upi"
              name="payment-method"
              value="upi"
              checked={selectedMethod === "upi"}
              onChange={handleMethodChange}
            />
            <label htmlFor="payment_upi">UPI</label>
            <p data-method="upi">
              Please send a Check to Store name with Store Street, Store Town,
              Store State, Store Postcode, Store Country.
            </p>
          </div>

          <div className="single-method">
            <input type="checkbox" id="accept_terms" />
            <label htmlFor="accept_terms">
              I’ve read and accept the terms &amp; conditions
            </label>
          </div>
        </div>
        <button className="place-order" onClick={handlePlaceOrder}>
          Place order
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;
