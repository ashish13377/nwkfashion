const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');

// Get all products
router.get('/', productController.getAllProducts);

// Get a specific product by ID
router.get('/:productId', productController.getProductById);

// Create a new product
router.post('/', productController.createProduct);

// Update a product by ID
router.put('/:productId', productController.updateProduct);

// Delete a product by ID
router.delete('/:productId', productController.deleteProduct);

// Get all products by category name
router.get('/products/category/:categoryName', getProductsByCategory); 

module.exports = router;
