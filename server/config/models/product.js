const mongoose = require("mongoose");

// Define Product schema
const productSchema = new mongoose.Schema({
  imageSrc: {
    type: String,
  },
  title: {
    type: String,
  },
  rating: {
    type: Number,
  },
  sizes: {
    type: [String],
  },
  colors: [
    {
      color: {
        type: String,
      },
      zoomImage: {
        type: String,
      },
    },
  ],
  price: {
    type: String,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  categoryName: {
    type: String,
  },
  description: {
    type: String,
  },
  availability: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  socialMedia: [
    {
      name: {
        type: String,
      },
      icon: {
        type: String,
      },
    },
  ],
  compositions: {
    type: String,
  },
  styles: {
    type: String,
  },
  properties: {
    type: String,
  },
  zoomImage: {
    type: String,
  },
  image: {
    type: String,
  },
  productType: {
    type: String,
  },
  reviews: [
    {
      text: {
        type: String,
      },
      user: {
        type: String, // You may need to adjust the type based on how user IDs are stored
        // Replace 'User' with the actual name of your user model
      },
    },
  ],
});

// Create and export Product model
module.exports = mongoose.model("Product", productSchema);
