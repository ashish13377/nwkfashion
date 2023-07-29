// order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderID: {
    type: String,

    unique: true,
  },
  razorpay: {
    type: String,
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
    address: {
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
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  productDetails: [
    {
      product: {
        type: String,
      },
      name: {
        type: String,
      },
      price: {
        type: String,
      },
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
