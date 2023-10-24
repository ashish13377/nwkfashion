const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");

// Get all products who i am
router.get("/", productController.getAllProducts);

// Get a specific product by ID
router.get("/:productId", productController.getProductById);

// Create a new product
router.post("/", productController.createProduct);

// Update a product by ID
router.put("/:productId", productController.updateProduct);

// Delete a product by ID
router.delete("/:productId", productController.deleteProduct);

// Get all products by category name
router.get("/category/:categoryName", productController.getProductsByCategory);

// Create a review for a product
router.post("/:productId/reviews", productController.createReview);

// Get all reviews for a product
router.get("/:productId/reviews", productController.getReviews);

module.exports = router;
