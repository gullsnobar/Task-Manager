const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    console.log("========== AUTH CHECK ==========");
    console.log("Cookies:", req.cookies);

    const token = req.cookies?.token;

    console.log("Token exists:", !!token);

    if (!token) {
      console.log("❌ TOKEN NOT FOUND");

      return res.status(401).json({
        success: false,
        message: "Not authenticated - token missing",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded JWT:", decoded);

    const user = await User.findById(
      decoded.userId
    ).select("-password");

    console.log("User found:", !!user);

    if (!user) {
      console.log("❌ USER NOT FOUND");

      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    req.user = user;

    console.log("✅ AUTHENTICATION SUCCESS");

    next();

  } catch (error) {
    console.log("❌ JWT ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token",
    });
  }
};

module.exports = protect;