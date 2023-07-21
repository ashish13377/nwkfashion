// orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create a new order
router.post('/orders', orderController.createOrder);

// Get all orders
router.get('/orders', orderController.getAllOrders);

// Get an order by ID
router.get('/orders/:orderId', orderController.getOrderById);

// Update an order
router.put('/orders/:orderId', orderController.updateOrder);

// Delete an order
router.delete('/orders/:orderId', orderController.deleteOrder);

module.exports = router;
