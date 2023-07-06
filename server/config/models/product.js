const mongoose = require('mongoose');


// Define Product schema
const productSchema = new mongoose.Schema({
  imageSrc: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  sizes: {
    type: [String],
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,  // Stores the ID of the category the product belongs to
    ref: 'Category',  // References the 'Category' model
    required: true,
  },
});

// Create and export Product model
module.exports = mongoose.model('Product', productSchema);
