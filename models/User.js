const { Schema, model, Types } = require('mongoose');

const subSchema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [subSchema],
  favorites: [subSchema],
  orders: [subSchema],
});

module.exports = model('User', schema);
