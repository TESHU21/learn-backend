import { success } from "zod";
import { ApiError } from "../utils/ApiError.js";
export const globalErrorHandler = (err, re, res, next) => {
  let error = err;
  // If error is not ApiError,convert it
  if (!(error instanceof ApiError)) {
    error = new ApiError(
      err.statusCode || 5000,
      err.message || "Internal Server Error"
    );
  }
  const response = {
    success: false,
    message: error.message,
  };
  // Include stack trace only in development
  if (process.env.NODE_ENV === "development") {
    response.stack = error.stack;
    response.errors = error.errors;
  }
  res.status(error.statusCode).json(response);
};
