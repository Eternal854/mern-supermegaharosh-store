const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: [String], required: true },
  category: { type: Number, required: true },
});

module.exports = model('Item', schema);
