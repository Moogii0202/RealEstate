const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  location: String,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
