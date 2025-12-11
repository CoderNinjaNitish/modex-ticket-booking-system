// Global error handler middleware
module.exports = function errorHandler(err, req, res, next) {
  console.error("ERROR:", err);
  res.status(500).json({ error: "Something went wrong" });
};
