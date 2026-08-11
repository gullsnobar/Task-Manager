const express = require("express");

const {
  registerUser,
    loginUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", (req, res) => {
  res.json({
    message: "Logout route working",
  });
});

module.exports = router;