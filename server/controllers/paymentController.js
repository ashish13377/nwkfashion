// controllers/paymentController.js

const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../config/models/order");

// Set up your Razorpay instance (replace <YOUR_RAZORPAY_KEY_ID> and <YOUR_RAZORPAY_KEY_SECRET> with your actual keys)
const razorpay = new Razorpay({
  key_id: "rzp_test_LyQl8cyV8Y1ACw",
  key_secret: "MEUwA5dXwpQMcLggdReCQr7O",
});

// Function to generate the Razorpay order
const createOrder = (req, res) => {
  const options = {
    amount: req.body.amount, // Amount in paise (100 paise = 1 rupee)
    currency: "INR",
    receipt: "order_receipt",
  };

  razorpay.orders.create(options, (err, order) => {
    if (err) {
      console.error("Error creating order:", err);
      return res.status(500).json({ error: "Something went wrong!" });
    }
    return res.status(200).json(order);
  });
};

// Function to confirm the payment after success
const confirmPayment = (req, res) => {
  const paymentData = req.body;
  console.log(paymentData);
  // // Verify the payment using Razorpay's utility function
  const generatedSignature = crypto
    .createHmac("sha256", "MEUwA5dXwpQMcLggdReCQr7O")
    .update(
      paymentData.razorpay_order_id + "|" + paymentData.razorpay_payment_id
    )
    .digest("hex");

  if (generatedSignature === paymentData.razorpay_signature) {
    res
      .status(200)
      .json({ message: "Payment successful and order saved!", paymentData });
  }
};

module.exports = {
  createOrder,
  confirmPayment,
};
