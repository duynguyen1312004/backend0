const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization:", req.headers.authorization);

    if (!authHeader) {
      return res.status(401).json({
        EC: -1,
        message: "Authorization header is missing",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        EC: -1,
        message: "Token is missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      EC: -1,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
