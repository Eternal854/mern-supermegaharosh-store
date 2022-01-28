const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const router = Router();

// /api/user/register
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: 'Некорректные данные при регистрации' });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: 'Пользователь создан' });
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
  },
);

// /api/user/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: 'Некорректные данные при входе' });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль' });
      }

      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' });

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
  },
);

router.get('/cartItems', auth, async (req, res) => {
  try {
    const items = await User.find({ _id: req.user.userId }, { _id: 0, cart: 1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.put('/addToCart', auth, async (req, res) => {
  try {
    const item = await User.updateOne({ _id: req.user.userId }, { $push: { cart: req.body } });
    res.status(200).json({ message: 'Товар добавлен в корзину' });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.delete('/removeFromCart', auth, async (req, res) => {
  try {
    const item = await User.updateOne({ _id: req.user.userId }, { $pull: { cart: req.body } });
    res.status(200).json({ message: 'Товар удален из корзины' });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.delete('/clearCart', auth, async (req, res) => {
  try {
    const item = await User.updateOne({ _id: req.user.userId }, { $set: { cart: [] } });
    res.status(200).json({ message: 'Корзина очищена' });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.get('/favoriteItems', auth, async (req, res) => {
  try {
    const items = await User.find({ _id: req.user.userId }, { _id: 0, favorites: 1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.put('/addToFavorites', auth, async (req, res) => {
  try {
    const item = await User.updateOne({ _id: req.user.userId }, { $push: { favorites: req.body } });
    res.status(200).json({ message: 'Товар добавлен в избранное' });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.delete('/removeFromFavorites', auth, async (req, res) => {
  try {
    const item = await User.updateOne({ _id: req.user.userId }, { $pull: { favorites: req.body } });
    res.status(200).json({ message: 'Товар удален из избранного' });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.get('/orders', auth, async (req, res) => {
  try {
    const items = await User.find({ _id: req.user.userId }, { _id: 0, orders: 1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.put('/addToOrders', auth, async (req, res) => {
  try {
    const item = await User.updateOne({ _id: req.user.userId }, { $push: { orders: req.body } });
    res.status(200).json({ message: 'Заказ оформлен' });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
