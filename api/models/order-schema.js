const Joi = require('joi');
const books = require('../files/books');

const orderSchema = Joi.object().options({ abortEarly: false }).keys({
  order: Joi.array().min(1).items(Joi.object().keys({
    id: Joi.number().valid(books.map(book => book.id)).required(),
    quantity: Joi.number().min(1).required(),
  })).required(),
  first_name: Joi.string().min(4).max(50).required(),
  last_name: Joi.string().min(5).max(50).required(),
  city: Joi.string().required(),
  zip_code: Joi.string().regex(/\d{2}-\d{3}/).required(),
});

module.exports = orderSchema;
