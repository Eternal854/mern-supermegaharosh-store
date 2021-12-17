const { request } = require('express');
const Router = require('express');

const Item = require('../models/Item');
const auth = require('../middleware/auth.middleware');

const router = Router();

router.post('/add', async (req, res) => {
  try {
    const { title, price, imageUrl } = req.body;

    const cartItem = new Item({
      title,
      price,
      imageUrl,
    });

    await cartItem.save();

    res.status(201).json(cartItem);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.get('/', async (req, res) => {
  try {
    const cartItems = await Item.find();
    res.json(cartItems);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cartItem = await Item.findById(req.params.id);
    res.json(cartItem);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
