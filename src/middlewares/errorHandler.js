const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);

  return res.status(err.statusCode || 500).json({
    EC: -1,
    message: err.message || "Internal server error",
  });
};

module.exports = errorHandler;
