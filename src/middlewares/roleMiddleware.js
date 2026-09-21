const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        EC: -1,
        message: "Unauthorized",
      });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        EC: -1,
        message: "You do not have permission",
      });
    }

    next();
  };
};

module.exports = roleMiddleware;
