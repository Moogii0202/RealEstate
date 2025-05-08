const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  location: String,
  district: String,
  khoroo: String,
  rooms: Number,
  area: Number,
  buildingFloor: Number,
  unitFloor: Number,
  builtYear: Number,
  paymentType: String,
  elevator: String,
  phone: String,
  image: {
    data: Buffer,
    contentType: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);