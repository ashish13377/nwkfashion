const mongoose = require('mongoose');

// Define Category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

// Create and export Category model
module.exports = mongoose.model('Category', categorySchema);
