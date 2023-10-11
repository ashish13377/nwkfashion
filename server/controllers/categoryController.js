const Category = require("../config/models/category");

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific category by ID
const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(422).json({ error: "Please enter the category name" });
    }

    const category = new Category({
      name,
    });

    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // If the category exists, delete it
    await Category.findByIdAndRemove(categoryId);

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Edit an existing category
const editCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updates = req.body; // New category data

    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Update the category with the new data
    Object.assign(category, updates);
    const updatedCategory = await category.save();

    res.json(updatedCategory);
  } catch (error) {
    console.error("Error editing category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  // ...other functions
  editCategory, // Add the editCategory function to your exports
};

// Other category controller functions...

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  editCategory,
  // Other category controller functions...
};
