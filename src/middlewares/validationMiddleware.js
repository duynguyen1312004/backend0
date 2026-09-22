const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        EC: -1,
        message: "Validation error",
        errors: error.details.map((item) => item.message),
      });
    }

    next();
  };
};

module.exports = validationMiddleware;
