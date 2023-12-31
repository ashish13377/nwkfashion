const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get a specific category by ID
router.get("/:categoryId", categoryController.getCategoryById);

// Create a new category
router.post("/", categoryController.createCategory);

// Delete a category by ID
router.delete("/:categoryId", categoryController.deleteCategory);

// Edit an existing category
router.put("/:categoryId", categoryController.editCategory);

module.exports = router;
