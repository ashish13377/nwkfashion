// controllers/orderController.js
const Order = require("../config/models/order"); // Assuming the path to the order.js file
const User = require("../config/models/user");
const Product = require("../config/models/product");
const moment = require("moment"); // Import the moment library for date formatting

// Create a new order
async function createOrder(req, res) {
  // console.log(req.body);
  try {
    const lastOrder = await Order.findOne({}, {}, { sort: { orderID: -1 } });
    let lastOrderIDNumber = 0;

    if (lastOrder) {
      const lastOrderNumber = parseInt(lastOrder.orderID.slice(7));
      if (!isNaN(lastOrderNumber)) {
        lastOrderIDNumber = lastOrderNumber;
      }
    }

    const newOrderNumber = lastOrderIDNumber + 1;

    const newOrderID = `OIDNWK${String("000" + newOrderNumber).slice(-3)}`;

    // Get customer data by userId
    const customer = await User.findOne({ _id: req.body.userId });

    // Sample product data (replace this with actual product data retrieval)

    const productInfo = [];
    for (const productDetail of req.body.productDetails) {
      const product = await Product.findOne({ _id: productDetail.productID });
      if (product) {
        const productData = product.toObject();
        productData.quantiti = productDetail.quantiti; // Add quantiti to productData
        productInfo.push(productData);
      } else {
        console.log(`Product not found for ID: ${productDetail.productID}`);
      }
    }

    // Format the date when the order is made as "Jun 4, 2020"
    const orderDate = moment().format("MMM D, YYYY");

    const orderData = {
      orderID: newOrderID,
      razorpay: req.body.razorpay,
      address: req.body.address,
      paymentMethod: req.body.paymentMethod,
      date: orderDate,
      userId: req.body.userId,
      productID: productInfo.map((product) => product._id),
      productDetails: productInfo, // Include the full product data
      orderStatus: "Pending",
      customerInfo: customer.toObject(), // Include the full customer data
      totalPrice: req.body.totalPrice,
      subTotal: req.body.subTotal,
      shippingFee: req.body.shippingFee,
      gst: req.body.gst,
    };

    const order = new Order(orderData);

    await order.save();

    // Find the user and check if avatarBg is already set
    const user = await User.findById(req.body.userId);
    if (user.avatarBg) {
      // If avatarBg exists, only update lastOrderAmount and lastOrderDate
      await User.findByIdAndUpdate(req.body.userId, {
        $set: {
          lastOrderAmount: req.body.totalPrice,
          lastOrderDate: orderDate,
        },
      });
    } else {
      // If avatarBg doesn't exist, update lastOrderAmount, lastOrderDate, and avatarBg
      await User.findByIdAndUpdate(req.body.userId, {
        $set: {
          lastOrderAmount: req.body.totalPrice,
          lastOrderDate: orderDate,
          avatarBg: pickRandomColor(),
        },
      });
    }

    console.log(orderData);
    res.status(201).json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Unable to create order" });
  }
}

// Helper function to pick a random color from the predefined options
function pickRandomColor() {
  const colors = [
    "purple",
    "info",
    "danger",
    "primary",
    "warning",
    "pink",
    "secondary",
    "blue",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
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
    const orders = await Order.find();
    res.json({ message: "Order deleted successfully", orders });
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

// Update an order
async function updateOrder(req, res) {
  try {
    const orderId = req.params.orderId;
    const updates = req.body;

    const order = await Order.findByIdAndUpdate(orderId, updates, {
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

// Update the order status by ID
async function updateOrderStatus(req, res) {
  try {
    const orderId = req.params.orderId;
    const newStatus = req.body.status; // Assuming you provide the new status in the request body
    // Find the order by ID and update the status
    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: newStatus },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Unable to update order status" });
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
  updateOrder,
  updateOrderStatus,
};
