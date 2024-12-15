const express = require("express");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
//const { check } = require("express-validator");
const authenticate = require("../middlewares/authenticate");
const validateProduct = require("../middlewares/validateProduct");
const router = express.Router();

router.post("/", authenticate, validateProduct, createProduct);

router.get("/", authenticate, getProducts);
router.put("/:id", authenticate, updateProduct);
router.delete("/:id", authenticate, deleteProduct);

module.exports = router;
