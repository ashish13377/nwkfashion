// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const {
  createOrder,
  confirmPayment,
} = require("../controllers/paymentController");

// Define routes for payment handling
router.post("/createOrder", createOrder);
router.post("/confirmPayment", confirmPayment);

module.exports = router;
