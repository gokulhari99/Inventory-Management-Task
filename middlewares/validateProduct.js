const { check, validationResult } = require("express-validator");

const validateProduct = [
  check("name").notEmpty().withMessage("Name is required"),
  check("price").isNumeric().withMessage("Price must be a number"),
  check("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
  check("category").notEmpty().withMessage("Category is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateProduct;
