// controllers/orderController.js
const Order = require("../config/models/order"); // Assuming the path to the order.js file

// Create a new order
async function createOrder(req, res) {
  try {
    console.log(req.body);
    const lastOrder = await Order.findOne({}, {}, { sort: { orderID: -1 } });
    let lastOrderIDNumber = 0;

    if (lastOrder) {
      const lastOrderNumber = parseInt(lastOrder.orderID.slice(7));
      if (!isNaN(lastOrderNumber)) {
        lastOrderIDNumber = lastOrderNumber;
      }
    }

    const newOrderNumber = lastOrderIDNumber + 1;
    const newOrderID = `OIDNWK${String("0000000" + newOrderNumber).slice(-7)}`;

    const orderData = {
      orderID: newOrderID,
      razorpay: req.body.razorpay,
      address: req.body.address,
      paymentMethod: req.body.paymentMethod,
      userId: req.body.userId,
      productID: req.body.productID,
      productDetails: req.body.productDetails,
    };

    const order = new Order(orderData);
    await order.save();
    console.log(orderData);
    res.status(201).json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Unable to create order" });
  }
}

// Get all orders
async function getAllOrders(req, res) {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch orders" });
  }
}

// Get an order by ID
async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch order" });
  }
}

// Update an order
async function updateOrder(req, res) {
  try {
    const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, {
      new: true,
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Unable to update order" });
  }
}

// Delete an order
async function deleteOrder(req, res) {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Unable to delete order" });
  }
}

// Get orders by user ID
async function getOrdersByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Unable to fetch orders for the specified user" });
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
};
