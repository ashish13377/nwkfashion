import React from "react";

const PaymentMethod = () => {
  return (
    <div>
      {" "}
      <div className="col-12 mb-40">
        <h4 className="checkout-title">Payment Method</h4>
        <div className="checkout-payment-method">
          <div className="single-method">
            <input
              type="radio"
              id="payment_bank"
              name="payment-method"
              defaultValue="bank"
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
              defaultValue="cash"
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
              id="payment_paypal"
              name="payment-method"
              defaultValue="paypal"
            />
            <label htmlFor="payment_paypal">Paypal</label>
            <p data-method="paypal">
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
        <button className="place-order">Place order</button>
      </div>
    </div>
  );
};

export default PaymentMethod;
