1. User Authentication

Objective:
To create secure user registration and login endpoints using JWT for authentication and bcrypt for password hashing.

User Schema Creation:

Defined a Mongoose schema with fields for name, email, and password.
Enforced email uniqueness.

Registration Endpoint:

Created a /register route in authRoutes.js.
Used express-validator to validate inputs (e.g., ensuring a valid email format and password length).
Secured passwords by hashing them with bcrypt.
Saved the hashed password and user details in MongoDB.

Login Endpoint:

Created a /login route in authRoutes.js.
Validated user credentials against stored data.
Used bcrypt.compare to verify hashed passwords.
Generated a JWT token with a 1-hour expiration time for authenticated sessions.

Authentication Middleware:

Developed a middleware in middlewares/authenticate.js.
Extracted and verified JWT from the Authorization header.
Attached the authenticated user’s details to req.user.

2. Inventory Management

Objective:
Develop CRUD operations for managing products in the inventory.

Product Schema Creation:
Defined a Mongoose schema in models/Product.js with fields for name, price, quantity, and category.

Create Product:
Added a /products POST route in productRoutes.js.
Used express-validator for input validation (e.g., ensuring price is numeric, quantity is an integer).
Saved product details to MongoDB after validation.

Read Products:
Implemented a GET /products route.
Added optional filtering by category using query parameters.
Retrieved products from MongoDB using a flexible query filter.

Update Product:
Added a PUT /products/:id route.
Validated inputs and updated the product details in MongoDB by ID.

Delete Product:
Added a DELETE /products/:id route.
Removed the product by its ID using findByIdAndDelete.

3. Database Integration

Objective:
Use MongoDB for storing user and product data with structured schemas.

Database Connection:
Created config/db.js for MongoDB connection logic using mongoose.connect().
Loaded the connection string securely from the .env file.

Structured Models:
Created separate schema files (models/User.js and models/Product.js) for clear separation of concerns.
Used appropriate Mongoose data types and constraints for fields.

4. Validation and Error Handling

Objective:
Ensure proper request validation and implement consistent error handling.

Validation:
Used express-validator in all routes for validating inputs.
Ensured error messages are user-friendly and descriptive.

Global Error Handling Middleware:
Created a middleware in middlewares/errorHandler.js.
Centralized error handling for uncaught exceptions or errors from asynchronous operations.
Returned consistent error responses in JSON format.

Route-Specific Error Handling:
Handled specific errors like duplicate email registration or product not found in individual route handlers.
