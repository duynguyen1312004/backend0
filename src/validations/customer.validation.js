const Joi = require("joi");

const createCustomerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),

  phone: Joi.string()
    .pattern(/^[0-9]{9,11}$/)
    .required(),

  email: Joi.string().email().required(),
});

const updateCustomerSchema = Joi.object({
  customerId: Joi.string().required(),

  name: Joi.string().min(2).max(100).required(),

  phone: Joi.string()
    .pattern(/^[0-9]{9,11}$/)
    .required(),

  email: Joi.string().email().required(),
});

const deleteCustomerSchema = Joi.object({
  customerId: Joi.string().required(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  deleteCustomerSchema,
};
