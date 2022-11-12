const { Schema, model, Types } = require('mongoose');

const cartSchema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: [String], required: true },
  category: { type: Number, required: true },
  size: { type: Number, required: true },
});

const favoritesSchema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: [String], required: true },
  category: { type: Number, required: true },
});

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [cartSchema],
  favorites: [favoritesSchema],
  orders: [cartSchema],
});

module.exports = model('User', schema);
