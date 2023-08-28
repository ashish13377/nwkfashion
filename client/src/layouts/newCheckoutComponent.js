import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverAPILocal } from "../App";
import Swal from "sweetalert2";
const NewCheckoutComponent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = useSelector((state) => state.cart.userId);

  const [selectedMethod, setSelectedMethod] = useState("");
  const products = useSelector(
    (state) =>
      state.cart.products.filter((product) => product.userId === userId) // Filter products based on userId
  );
  console.log("products:", products);

  const [formData, setFormData] = useState({
    razorpay: "test",
    address: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNo: "",
      address: "",
      country: "",
      townCity: "",
      state: "",
      zipCode: "",
    },

    paymentMethod: "",
    userId: user ? user._id : "",
    productID: [],
    productDetails: [], // Initialize productDetails as an empty array
    totalPrice: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.includes(".")) {
      const [parentField, nestedField] = name.split(".");
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: {
          ...prevFormData.address,
          [parentField]: {
            ...prevFormData.address[parentField],
            [nestedField]: value,
          },
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const productIDs = products.map((product) => product._id);
    const productDetails = products.map((product) => ({
      productID: product._id,
      name: product.title,
      price: product.price,
      quantiti: product.quantiti,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      productID: productIDs,
      productDetails: productDetails,
      totalPrice: calculateTotal(),
    }));
  }, []);

  const shippingCostThreshold = 1000; // The order total above which free shipping is applicable
  const shippingCost = 100; // Flat shipping cost for orders below the shippingCostThreshold

  // GST percentages for different categories
  const calculateShippingCost = (subtotal) => {
    if (subtotal >= 1000) {
      return 0; // Free shipping for orders 1k or above
    } else {
      return 100; // Rs.100 flat shipping for orders below 1k
    }
  };
  const gstPercentages = {
    clothing: 5,
    leathergoods: 18,
  };

  const calculateGST = (price, compositions) => {
    const gstPercentage = gstPercentages[compositions];
    return (price * gstPercentage) / 100;
  };
  const calculateSubtotal = () => {
    let subtotal = 0;

    products.forEach((product) => {
      const price = parseFloat(
        product.price.replace("$", "") * product.quantiti
      );
      subtotal += price;
    });

    return subtotal;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shippingCost = calculateShippingCost(subtotal);

    let totalGST = 0;
    products.forEach((product) => {
      const compositions = product.compositions;
      if (gstPercentages.hasOwnProperty(compositions)) {
        const price = parseFloat(
          product.price.replace("$", "") * product.quantiti
        );
        const gst = calculateGST(price, compositions);
        totalGST += gst;
      }
    });

    return subtotal + shippingCost + totalGST;
  };

  const calculateTotalGST = () => {
    let totalGST = 0;
    products.forEach((product) => {
      const compositions = product.compositions;
      if (gstPercentages.hasOwnProperty(compositions)) {
        const price = parseFloat(
          product.price.replace("$", "") * product.quantiti
        );
        const gst = calculateGST(price, compositions);
        totalGST += gst;
      }
    });
    // console.log("totalGST:", totalGST);
    return totalGST;
  };

  const handleMethodChange = (event) => {
    const { value } = event.target;
    setSelectedMethod(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      paymentMethod: value,
    }));
  };
  const calculateTotalInPaise = calculateTotal * 100;

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
        // onOrderDetailsChange(response.data.id);

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
  console.log(formData);
  return (
    <div className="page-section section section-padding">
      <div className="container">
        {/* Checkout Form s*/}
        <form action="#" className="checkout-form">
          <div className="row row-50 mbn-40">
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
                      value={formData.address.firstName}
                      placeholder="First Name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 col-12 mb-5">
                    <label>Last Name*</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.address.lastName}
                      placeholder="Last Name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 col-12 mb-5">
                    <label>email Address*</label>
                    <input
                      type="email"
                      name="emailAddress"
                      value={formData.address.emailAddress}
                      placeholder="Email Address"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 col-12 mb-5">
                    <label>Phone no*</label>
                    <input
                      type="text"
                      name="phoneNo"
                      value={formData.address.phoneNo}
                      placeholder="Phone number"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 mb-5">
                    <label>Address*</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address.address}
                      placeholder="Address"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 col-12 mb-5">
                    <label>Country*</label>
                    <select
                      className="nice-select"
                      name="country"
                      value={formData.address.country}
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
                      name="townCity"
                      value={formData.address.townCity}
                      placeholder="Town/City"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 col-12 mb-5">
                    <label>State*</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.address.state}
                      placeholder="State"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 col-12 mb-5">
                    <label>Zip Code*</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.address.zipCode}
                      placeholder="Zip Code"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="row">
                {/* Cart Total */}
                <div className="col-12 mb-40">
                  <h4 className="checkout-title">Cart Total</h4>
                  <div className="checkout-cart-total">
                    <h4>
                      Product <span>Total</span>
                    </h4>
                    <ul>
                      {products.map((product) => (
                        <li key={product.id}>
                          {product.title} (Quantiti: {product.quantiti})
                          <span>
                            $
                            {parseFloat(product.price.replace("$", "")) *
                              product.quantiti}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p>
                      Sub Total <span>${calculateSubtotal()}</span>
                    </p>
                    <p>
                      Shipping Fee{" "}
                      <span>
                        $
                        {calculateSubtotal() >= shippingCostThreshold
                          ? 0
                          : calculateShippingCost()}
                      </span>
                    </p>
                    <p>
                      GST <span>${calculateTotalGST()}</span>
                    </p>
                    <h4>
                      Grand Total <span>${calculateTotal()}</span>
                    </h4>
                  </div>
                </div>
                {/* Payment Method */}

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
                        Please send a Check to Store name with Store Street,
                        Store Town, Store State, Store Postcode, Store Country.
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
                        Please send a Check to Store name with Store Street,
                        Store Town, Store State, Store Postcode, Store Country.
                      </p>
                    </div>

                    <div className="single-method">
                      <input
                        type="checkbox"
                        id="accept_terms"
                        // checked={termsAccepted}
                        // onChange={handleTermsChange}
                      />
                      <label htmlFor="accept_terms">
                        I’ve read and accept the terms &amp; conditions
                      </label>
                    </div>
                  </div>
                  <a
                    className="place-order"
                    onClick={checkoutHandler}
                    // disabled={!allInputsFilled} // Disable the button if not all inputs are filled
                  >
                    Place order
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCheckoutComponent;
