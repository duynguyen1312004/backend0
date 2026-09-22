const Joi = require("joi");

const createProjectSchema = Joi.object({
  type: Joi.string().valid("EMPTY-PROJECT").required(),

  name: Joi.string().min(3).max(100).required(),

  startDate: Joi.string().required(),

  endDate: Joi.string().required(),

  description: Joi.string().max(500).allow(""),

  customerInfor: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
  }).required(),

  leader: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  }).required(),
});

const addUsersToProjectSchema = Joi.object({
  type: Joi.string().valid("ADD-USERS").required(),

  projectId: Joi.string().required(),

  usersArr: Joi.array().items(Joi.string().required()).min(1).required(),
});

module.exports = {
  createProjectSchema,
  addUsersToProjectSchema,
};
