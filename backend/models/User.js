// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User model-д
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Хэрэглэгч үүсгэхээс өмнө password-ийг hash хийх
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // 10 бол salt rounds
  }
  next();
});

module.exports = mongoose.model('User', userSchema);