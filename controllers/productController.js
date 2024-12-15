const Product = require("../models/Product");

// Create Product
exports.createProduct = async (req, res) => {
  const { name, price, quantity, category } = req.body;

  try {
    const product = new Product({ name, price, quantity, category });
    await product.save();
    res.status(201).json({ message: "Product created successfully.", product });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
};

// Get Products
exports.getProducts = async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};

  try {
    const products = await Product.find(filter);
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json({ message: "Product updated successfully.", product });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
};
