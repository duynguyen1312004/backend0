const Joi = require("joi");

const createTaskSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),

  description: Joi.string().max(500).allow(""),

  status: Joi.string().valid("TODO", "IN_PROGRESS", "DONE").required(),

  startDate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required(),

  endDate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required(),

  assignedTo: Joi.string().required(),

  projectId: Joi.string().required(),
});

const updateTaskSchema = Joi.object({
  taskId: Joi.string().required(),

  name: Joi.string().min(3).max(100).required(),

  endDate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required(),

  description: Joi.string().max(500).allow(""),

  status: Joi.string().valid("TODO", "IN_PROGRESS", "DONE").required(),
});

const deleteTaskSchema = Joi.object({
  taskId: Joi.string().required(),

  type: Joi.string().valid("REMOVE-TASK", "REMOVE-ASSIGNED-USER").required(),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
};
