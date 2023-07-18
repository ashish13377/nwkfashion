import React, { useState } from "react";
import BillingAddress from "./billingAddress";
import CardTotal from "./cardTotal";
import PaymentMethod from "./paymentMethod";
import { useSelector } from "react-redux";
const CheckoutComponent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const products = useSelector((state) => state.cart.products);

  const calculateSubtotal = () => {
    let subtotal = 0;

    products.forEach((product) => {
      const price = parseFloat(product.price.replace("$", ""));

      subtotal += price;
    });

    return subtotal;
  };

  const shippingCost = 10;

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    // Replace with your shipping cost calculation

    return subtotal + shippingCost;
  };

  return (
    <div>
      <div>
        <div className="page-section section section-padding">
          <div className="container">
            {/* Checkout Form s*/}
            <form action="#" className="checkout-form">
              <div className="row row-50 mbn-40">
                <BillingAddress
                  formData={formData}
                  onFormDataChange={handleChange}
                />
                <div className="col-lg-5">
                  <div className="row">
                    {/* Cart Total */}
                    <CardTotal
                      products={products}
                      shippingCost={shippingCost}
                      calculateSubtotal={calculateSubtotal()}
                      calculateTotal={calculateTotal()}
                    />
                    {/* Payment Method */}
                    <PaymentMethod
                      formData={formData}
                      products={products}
                      shippingCost={shippingCost}
                      calculateSubtotal={calculateSubtotal()}
                      calculateTotal={calculateTotal()}
                    />
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
