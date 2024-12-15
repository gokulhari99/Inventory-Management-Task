const express = require("express");
const { register, login } = require("../controllers/authController");
const { check } = require("express-validator");
const router = express.Router();

router.post(
  "/register",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Invalid email format"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  register
);

router.post("/login", login);

module.exports = router;
