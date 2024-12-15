// // Required Dependencies
// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const bodyParser = require("body-parser");
// const { check, validationResult } = require("express-validator");

// // Load environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;
// const JWT_SECRET = process.env.JWT_SECRET;
// const MONGO_URI = process.env.MONGO_URI;

// // Ensure environment variables are set
// if (!JWT_SECRET || !MONGO_URI) {
//   throw new Error(
//     "Missing required environment variables: JWT_SECRET, MONGO_URI"
//   );
// }

// // Middleware
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//     process.exit(1); // Exit if database connection fails
//   });

// // User Schema and Model
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model("User", userSchema);

// // Product Schema and Model
// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   quantity: { type: Number, required: true },
//   category: { type: String, required: true },
// });

// const Product = mongoose.model("Product", productSchema);

// // Authentication Middleware
// const authenticate = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) {
//     return res.status(401).json({ error: "Access denied. No token provided." });
//   }

//   try {
//     const verified = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ error: "Invalid token." });
//   }
// };

// // Routes

// // User Registration
// app.post(
//   "/api/register",
//   [
//     check("name").notEmpty().withMessage("Name is required"),
//     check("email").isEmail().withMessage("Invalid email format"),
//     check("password")
//       .isLength({ min: 8 })
//       .withMessage("Password must be at least 8 characters long")
//       .matches(/[A-Z]/)
//       .withMessage("Password must include at least one uppercase letter")
//       .matches(/[a-z]/)
//       .withMessage("Password must include at least one lowercase letter")
//       .matches(/\d/)
//       .withMessage("Password must include at least one number"),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { name, email, password } = req.body;

//     try {
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ error: "Email is already registered." });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new User({ name, email, password: hashedPassword });
//       await newUser.save();

//       res.status(201).json({ message: "User registered successfully." });
//     } catch (err) {
//       res.status(500).json({ error: "Server error." });
//     }
//   }
// );

// // User Login
// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: "Invalid email or password." });
//     }

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return res.status(400).json({ error: "Invalid email or password." });
//     }

//     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
//     res.status(200).json({ token });
//   } catch (err) {
//     res.status(500).json({ error: "Server error." });
//   }
// });

// // Create Product
// app.post(
//   "/api/products",
//   authenticate,
//   [
//     check("name").notEmpty().withMessage("Name is required"),
//     check("price").isNumeric().withMessage("Price must be a valid number"),
//     check("quantity")
//       .isInt({ min: 1 })
//       .withMessage("Quantity must be at least 1"),
//     check("category").notEmpty().withMessage("Category is required"),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { name, price, quantity, category } = req.body;

//     try {
//       const product = new Product({ name, price, quantity, category });
//       await product.save();
//       res
//         .status(201)
//         .json({ message: "Product created successfully.", product });
//     } catch (err) {
//       res.status(500).json({ error: "Server error." });
//     }
//   }
// );

// // Get Products
// app.get("/api/products", authenticate, async (req, res) => {
//   const { category } = req.query;
//   const filter = category ? { category } : {};

//   try {
//     const products = await Product.find(filter);
//     res.status(200).json({ products });
//   } catch (err) {
//     res.status(500).json({ error: "Server error." });
//   }
// });

// // Update Product
// app.put("/api/products/:id", authenticate, async (req, res) => {
//   const { id } = req.params;
//   const updates = req.body;

//   try {
//     const product = await Product.findByIdAndUpdate(id, updates, { new: true });
//     if (!product) {
//       return res.status(404).json({ error: "Product not found." });
//     }
//     res.status(200).json({ message: "Product updated successfully.", product });
//   } catch (err) {
//     res.status(500).json({ error: "Server error." });
//   }
// });

// // Delete Product
// app.delete("/api/products/:id", authenticate, async (req, res) => {
//   const { id } = req.params;

//   try {
//     const product = await Product.findByIdAndDelete(id);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found." });
//     }
//     res.status(200).json({ message: "Product deleted successfully." });
//   } catch (err) {
//     res.status(500).json({ error: "Server error." });
//   }
// });

// // Global Error Handling Middleware
// app.use((err, req, res, next) => {
//   res.status(500).json({ error: "Something went wrong." });
// });

// // Start the Server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Database connection
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

// Global Error Handling Middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
