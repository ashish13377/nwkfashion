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
  colors: [
    {
      color: {
        type: String,
        required: true,
      },
      zoomImage: {
        type: String,
        required: true,
      },
    },
  ],
  price: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  socialMedia: [
    {
      name: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
    },
  ],
  compositions: {
    type: String,
    required: true,
  },
  styles: {
    type: String,
    required: true,
  },
  properties: {
    type: String,
    required: true,
  },
  zoomImage: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
});

// Create and export Product model
module.exports = mongoose.model('Product', productSchema);
