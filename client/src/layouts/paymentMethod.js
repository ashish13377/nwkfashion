import React, { useState } from "react";
import axios from 'axios';
import { serverAPILocal } from '../App'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const PaymentMethod = ({
  formData,
  products,
  shippingCost,
  calculateSubtotal,
  calculateTotal,
}) => {
  // console.log(formData);
  // console.log(products);
  // console.log(shippingCost);
  // console.log(calculateSubtotal);
  // console.log(calculateTotal);


  // sample_orders.json
// {
//   "orderID": "OIDNWK0000001",
//   "razorpay": "sample_razorpay_1",
//   "address": {
//     "firstName": "John",
//     "lastName": "Doe",
//     "emailAddress": "john.doe@example.com",
//     "phoneNo": "1234567890",
//     "address": "123 Main Street",
//     "country": "USA",
//     "townCity": "New York",
//     "state": "NY",
//     "zipCode": "10001"
//   },
//   "paymentMethod": "Credit Card",
//   "userId": "user_id_1",
//   "productID": ["product_id_1", "product_id_2"],
//   "productDetails": [
//     {
//       "product": "Sample Product 1",
//       "name": "Product 1",
//       "price": 19.99
//     },
//     {
//       "product": "Sample Product 2",
//       "name": "Product 2",
//       "price": 29.99
//     }
//   ]
// }




  const [selectedMethod, setSelectedMethod] = useState("");

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };
  // console.log(selectedMethod);

  const handlePlaceOrder = () => {
    // Perform place order logic here
    console.log("Place order clicked");
  };


  const [orderDetails, setOrderDetails] = useState(null);

  // const 
  const dataSet ={
    name: "ashish",
    titel: "gandu"
  }

  const checkoutHandler = async () => {
    try {
      // Make an API call to the server to get the Razorpay order ID
      const response = await axios.post(`${serverAPILocal}/createOrder`, {
        amount: 100000, // Replace with the actual total price (in paise)
      });
     
      // Initialize Razorpay payment dialog
      const options = {
        key: 'rzp_test_vlhj7iddgURf8a',
        amount: response.data.amount,
        currency: response.data.currency,
        name: 'NWK FASHION',
        description: 'Payment for your order',
        order_id: response.data.id,
       
        handler: function (response) {
          axios.post(`${serverAPILocal}/confirmPayment`, response,).then((res) => {
            // console.log(res.data.message);
            setOrderDetails(response.data.id);
            if(res.status === 200){

              Swal.fire(
                'Payment successful!',
                `You got${res.data}!`,
                'success'
              )
            }
            // // Set order details in state to display in the modal
            // // setOrderDetails(res.data.order);
          });
        },
        prefill: {
          name: 'Ashish kumar', // Replace with user's name
          email: 'john.doe@example.com', // Replace with user's email
          contact: '6204477640', // Replace with user's contact number
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error during checkout:', error);
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
        <a className="place-order" onClick={checkoutHandler}>
          Place order
        </a>
      </div>
    </div>
  );
};

export default PaymentMethod;
