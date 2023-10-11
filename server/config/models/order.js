const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: true,
    unique: true,
  },
  razorpay: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    emailAddress: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    streetAddress: {
      type: String,
    },
    country: {
      type: String,
    },
    townCity: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: String,
    },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  productDetails: [
    {
      type: mongoose.Schema.Types.Mixed,
      // ref: "Product", // Assuming Product schema contains all product info
      required: true,
    },
  ],
  orderStatus: {
    type: String,
    enum: ["Pending", "Confirmed", "Shipped", "Delivered"],
    default: "Pending",
  },
  date: {
    type: String,
    required: true,
  },
  customerInfo: {
    type: Object, // You can adjust this based on your customer schema
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  subTotal: {
    type: String,
    required: true,
  },
  shippingFee: {
    type: String,
    required: true,
  },
  gst: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
