import React, { useState } from "react";
import BillingAddress from "./billingAddress";
import CardTotal from "./cardTotal";
import PaymentMethod from "./paymentMethod";
import { useSelector } from "react-redux";
import axios from 'axios';

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

  const shippingCostThreshold = 1000; // The order total above which free shipping is applicable
  const shippingCost = 100; // Flat shipping cost for orders below the shippingCostThreshold

  // GST percentages for different categories
  const gstPercentages = {
    clothing: 5,
    leather_goods: 18,
  };

  const calculateSubtotal = () => {
    let subtotal = 0;

    products.forEach((product) => {
      const price = parseFloat(product.price.replace("$", ""));
      subtotal += price;
    });

    return subtotal;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    // Calculate shipping cost based on the order total
    const shippingFee = subtotal >= shippingCostThreshold ? 0 : shippingCost;

    // Calculate GST based on the category of products
    let totalGST = 0;
    products.forEach((product) => {
      const productType = product.productType;
      if (gstPercentages.hasOwnProperty(productType)) {
        const gstPercentage = gstPercentages[productType];
        const price = parseFloat(product.price.replace("$", ""));
        const gst = (price * gstPercentage) / 100;
        totalGST += gst;
      }
    });

    return subtotal + shippingFee + totalGST;
  };


  // const [orderDetails, setOrderDetails] = useState(null);

  // const checkoutHandler = async () => {
  //   try {
  //     // Make an API call to the server to get the Razorpay order ID
  //     const response = await axios.post('http://localhost:5000/createOrder', {
  //       amount: 10000, // Replace with the actual total price (in paise)
  //     });

  //     // Initialize Razorpay payment dialog
  //     const options = {
  //       key: '<YOUR_RAZORPAY_KEY_ID>',
  //       amount: response.data.amount,
  //       currency: response.data.currency,
  //       name: 'Your Store Name',
  //       description: 'Payment for your order',
  //       order_id: response.data.id,
  //       handler: function (response) {
  //         // Handle the response after successful payment
  //         // Make an API call to confirm the payment
  //         axios.post('http://localhost:5000/confirmPayment', response).then((res) => {
  //           console.log(res.data.message);
  //           // Set order details in state to display in the modal
  //           setOrderDetails(res.data.order);
  //         });
  //       },
  //       prefill: {
  //         name: 'John Doe', // Replace with user's name
  //         email: 'john.doe@example.com', // Replace with user's email
  //         contact: '9876543210', // Replace with user's contact number
  //       },
  //     };

  //     const rzp1 = new window.Razorpay(options);
  //     rzp1.open();
  //   } catch (error) {
  //     console.error('Error during checkout:', error);
  //   }
  // };

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
                      shippingCostThreshold={shippingCostThreshold}
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
