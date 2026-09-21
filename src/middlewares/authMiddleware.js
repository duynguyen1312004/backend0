const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let token;

    // 1. Nếu có Authorization header → lấy JWT từ header
    const authHeader = req.headers.authorization;

    if (authHeader) {
      token = authHeader.split(" ")[1];
    }

    // 2. Nếu không có header → lấy JWT từ cookie
    if (!token && req.cookies.access_token) {
      token = req.cookies.access_token;
    }

    // 3. Không có token
    if (!token) {
      return res.status(401).json({
        EC: -1,
        message: "Token is missing",
      });
    }

    // 4. Kiểm tra JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Lưu thông tin user vào request
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
