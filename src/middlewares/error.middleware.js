import { ApiError } from "../utils/ApiError.js";

export const globalErrorHandler = (err, req, res, next) => {
  let error = err;

  // 🔥 Log full error (server-side only)
  console.error("🔥 ERROR", {
    message: err.message,
    source: err.source,
    stack: err.stack,
  });

  // Convert unknown errors to ApiError
  if (!(error instanceof ApiError)) {
    error = new ApiError(
      err.statusCode || 500,
      err.message || "Internal Server Error"
    );
  }

  const response = {
    success: false,
    message: error.statusCode >= 500 ? "Internal Server Error" : error.message,
  };

  // DEV-only debug info
  if (process.env.NODE_ENV === "development") {
    response.stack = error.stack;
    response.errors = error.errors || [];
  }

  res.status(error.statusCode).json(response);
};
