import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverAPILocal } from "../App";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const PaymentMethod = ({
  formData,
  onFormDataChange,
  onOrderDetailsChange,
  products,
  shippingCost,
  calculateSubtotal,
  calculateTotal,
}) => {
  console.log("paymentmethod", formData);
  // console.log(calculateTotal);
  const calculateTotalInPaise = calculateTotal * 100;
  // console.log(calculateTotalInPaise);
  const user = JSON.parse(localStorage.getItem("user"));
  const [allInputsFilled, setAllInputsFilled] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");

  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const isFilled =
      formData.address.firstName &&
      formData.address.lastName &&
      formData.address.emailAddress &&
      formData.address.phoneNo &&
      selectedMethod !== "" &&
      termsAccepted;

    setAllInputsFilled(isFilled);
  }, [formData, selectedMethod, termsAccepted]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    onFormDataChange(name, value); // Pass the orderDetails to the parent component
  };

  const handleMethodChange = (event) => {
    const { name, value } = event.target;
    setSelectedMethod(value); // Update selected payment method
    handleChange(event);
  };

  const handleTermsChange = () => {
    setTermsAccepted(!termsAccepted); // Toggle terms acceptance
  };

  const handleCheckout = () => {
    if (!allInputsFilled) {
      return; // Don't proceed if inputs are not filled
    }

    checkoutHandler();
  };
  const checkoutHandler = async () => {
    if (selectedMethod === "Cash on Delivery") {
      try {
        const response = await axios.post(`${serverAPILocal}/orders`, formData);
        // Handle the response data here
        Swal.fire("Order placed successfully!", "success");
        // You might want to clear the cart or perform other necessary actions here
      } catch (error) {
        console.error("Error during checkout:", error);
        Swal.fire("Error", "There was an error placing your order", "error");
      }
    } else {
      try {
        // Make an API call to the server to get the Razorpay order ID
        const response = await axios.post(`${serverAPILocal}/createOrder`, {
          amount: calculateTotalInPaise, // Replace with the actual total price (in paise)
        });
        onOrderDetailsChange(response.data.id);

        // Initialize Razorpay payment dialog

        const options = {
          key: "rzp_test_LyQl8cyV8Y1ACw",
          amount: response.data.amount,
          currency: response.data.currency,
          name: "NWK FASHION",
          description: "Payment for your order",
          order_id: response.data.id,

          handler: function (response) {
            axios
              .post(`${serverAPILocal}/confirmPayment`, response)
              .then((res) => {
                axios
                  .post(`${serverAPILocal}/orders`, formData)
                  .then((res) => {
                    // Handle the response data here

                    // console.log(res.data);
                    Swal.fire("Payment successful!", "success");
                  })
                  .catch((error) => {
                    // Handle any errors that occurred during the request
                    console.error("Error during payment confirmation:", error);
                    Swal.fire(
                      "Payment failed",
                      "There was an error processing your payment",
                      "error"
                    );
                  });
              });
          },

          prefill: {
            name: formData.address.firstName + " " + formData.address.lastName, // Replace with user's name
            email: formData.address.emailAddress, // Replace with user's email
            contact: formData.address.phoneNo, // Replace with user's contact number
          },
        };

        // console.log(options);
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } catch (error) {
        console.error("Error during checkout:", error);
        Swal.fire(
          "Error",
          "There was an error processing your payment",
          "error"
        );
      }
    }
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
              name="paymentMethod"
              value="Online payment"
              checked={formData.paymentMethod === "Online payment"}
              onChange={(event) => {
                handleMethodChange(event);
              }}
            />
            <label htmlFor="payment_bank">Online payment</label>
            <p data-method="bank">
              Please send a Check to Store name with Store Street, Store Town,
              Store State, Store Postcode, Store Country.
            </p>
          </div>
          <div className="single-method">
            <input
              type="radio"
              id="payment_cash"
              name="paymentMethod"
              value="Cash on Delivery"
              checked={formData.paymentMethod === "Cash on Delivery"}
              onChange={(event) => {
                handleMethodChange(event);
              }}
            />
            <label htmlFor="payment_cash">Cash on Delivery</label>
            <p data-method="cash">
              Please send a Check to Store name with Store Street, Store Town,
              Store State, Store Postcode, Store Country.
            </p>
          </div>

          <div className="single-method">
            <input
              type="checkbox"
              id="accept_terms"
              checked={termsAccepted}
              onChange={handleTermsChange}
            />
            <label htmlFor="accept_terms">
              I’ve read and accept the terms &amp; conditions
            </label>
          </div>
        </div>
        <a
          className="place-order"
          onClick={handleCheckout}
          disabled={!allInputsFilled} // Disable the button if not all inputs are filled
        >
          Place order
        </a>
      </div>
    </div>
  );
};

export default PaymentMethod;
