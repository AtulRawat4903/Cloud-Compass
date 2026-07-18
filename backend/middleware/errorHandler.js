export const errorHandler = (err, req, res, next) => {
  const status = err.response?.status || err.statusCode || 500;

  const message =
    err.response?.data?.message ||
    err.message ||
    "Something went wrong on the server.";

  if (status === 404 && err.response) {
    return res.status(404).json({ message: "Location not found." });
  }

  if (status === 401) {
    return res.status(500).json({
      message:
        "Weather provider rejected the request. Check that OPENWEATHER_API_KEY is set correctly on the server.",
    });
  }

  console.error(`[${status}]`, message);
  res.status(status).json({ message });
};

export const notFound = (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found.` });
};