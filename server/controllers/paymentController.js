// controllers/paymentController.js

const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../config/models/order');

// Set up your Razorpay instance (replace <YOUR_RAZORPAY_KEY_ID> and <YOUR_RAZORPAY_KEY_SECRET> with your actual keys)
const razorpay = new Razorpay({
  key_id: '<YOUR_RAZORPAY_KEY_ID>',
  key_secret: '<YOUR_RAZORPAY_KEY_SECRET>',
});

// Function to generate the Razorpay order
const createOrder = (req, res) => {
  const options = {
    amount: req.body.amount, // Amount in paise (100 paise = 1 rupee)
    currency: 'INR',
    receipt: 'order_receipt',
  };

  razorpay.orders.create(options, (err, order) => {
    if (err) {
      console.error('Error creating order:', err);
      return res.status(500).json({ error: 'Something went wrong!' });
    }
    return res.status(200).json(order);
  });
};

// Function to confirm the payment after success
const confirmPayment = (req, res) => {
  const paymentData = req.body;

  // Verify the payment using Razorpay's utility function
  const generatedSignature = crypto
    .createHmac('sha256', '<YOUR_RAZORPAY_KEY_SECRET>')
    .update(paymentData.razorpay_order_id + '|' + paymentData.razorpay_payment_id)
    .digest('hex');

  if (generatedSignature === paymentData.razorpay_signature) {
    // Payment successful, save the order details to MongoDB
    const newOrder = new Order({
      products: ['Product 1', 'Product 2'], // Replace with actual product names or IDs
      totalPrice: paymentData.amount / 100, // Convert amount from paise to rupees
      billingAddress: '123 Main St, City', // Replace with actual billing address
      shippingAddress: '456 Second St, City', // Replace with actual shipping address
      user: {
        name: 'John Doe', // Replace with user's name
        email: 'john.doe@example.com', // Replace with user's email
        contact: '9876543210', // Replace with user's contact number
      },
    });

    newOrder.save((err) => {
      if (err) {
        console.error('Error saving order to MongoDB:', err);
        return res.status(500).json({ error: 'Something went wrong!' });
      }
      return res.status(200).json({ message: 'Payment successful and order saved!', order: newOrder });
    });
  } else {
    return res.status(400).json({ error: 'Invalid payment data!' });
  }
};

module.exports = {
  createOrder,
  confirmPayment,
};
