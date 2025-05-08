const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check, validationResult } = require('express-validator');


router.post('/register', [
  check('name').notEmpty().withMessage('Нэр шаардлагатай'),
  check('email').isEmail().withMessage('Зөв имэйл оруулна уу'),
  check('password').isLength({ min: 6 }).withMessage('Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой'),
], authController.registerUser);

// Нэвтрэх - зөвхөн имэйл, нууц үг шалгалт
router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Имэйл буруу байна'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой')
  ],
  authController.loginUser
);

module.exports = router;