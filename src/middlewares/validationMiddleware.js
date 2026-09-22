const validationMiddleware = (schemas) => {
  return (req, res, next) => {
    let schema;

    if (req.body.type === "EMPTY-PROJECT") {
      schema = schemas.create;
    }

    if (req.body.type === "ADD-USERS") {
      schema = schemas.addUsers;
    }

    if (!schema) {
      return res.status(400).json({
        EC: -1,
        message: "Invalid project type",
      });
    }

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
