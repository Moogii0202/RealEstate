const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { validationResult } = require('express-validator');
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Алдаа байгаа бол буцааж илгээх
  }

  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Имэйл бүртгэгдсэн байна' });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Нэвтрэх
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Имэйл бүртгэгдээгүй байна' });
    }

    // password харьцуулах
    const isMatch = await bcrypt.compare(password, user.password); // hash-тай password-ийг харьцуулж байгаа
    if (!isMatch) {
      return res.status(400).json({ message: 'Нууц үг буруу байна' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Серверийн алдаа' });
  }
};
