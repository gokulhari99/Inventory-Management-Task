// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  // Customize error response based on error type or status
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";

  res.status(status).json({ error: message });
};

module.exports = errorHandler;
