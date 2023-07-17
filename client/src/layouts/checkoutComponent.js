import React from "react";
import BillingAddress from "./billingAddress";
import CardTotal from "./cardTotal";
import PaymentMethod from "./paymentMethod";

const CheckoutComponent = () => {
  return (
    <div>
      <div>
        <div className="page-section section section-padding">
          <div className="container">
            {/* Checkout Form s*/}
            <form action="#" className="checkout-form">
              <div className="row row-50 mbn-40">
                <BillingAddress />
                <div className="col-lg-5">
                  <div className="row">
                    {/* Cart Total */}
                    <CardTotal />
                    {/* Payment Method */}
                    <PaymentMethod />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default CheckoutComponent;
