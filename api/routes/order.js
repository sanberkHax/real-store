const express = require('express');
const router = express.Router();
const Joi = require('joi');
const  { FormValidationError } = require('../errors');
const orderSchema = require('../models/order-schema');

router.post('/', (req, res, next) => {
  const form = Joi.validate(req.body, orderSchema);
  if (form.error) {
    throw new FormValidationError(form.error
      .details
      .reduce((validation, {path, message}) => {
        validation[path.join('.')] = message;
        return validation;
      }, {}));
  }

  return res.status(201).json({
    data: Object.assign({ id: Math.floor(Math.random() * 10000) }, form.value),
  })
});

module.exports = router;
