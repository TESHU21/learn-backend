import { ApiError } from "../../src/utils/ApiError";

describe("ApiError", () => {
  it("should create an error with correct properties", () => {
    const message = "User not found";
    const statusCode = 404;
    const errors = ["Email is Missing"];

    const error = new ApiError(statusCode, message, errors);

    // Instance check
    expect(error).toBeInstanceOf(Error);

    // Message check
    expect(error.message).toBe(message);

    // Status code check
    expect(error.statusCode).toBe(statusCode);

    // Array value check ✅
    expect(error.errors).toEqual(errors);

    // Operational flag check
    expect(error.isOperational).toBe(true);

    // Stack trace exists
    expect(error.stack).toBeDefined();
    expect(error.stack).toContain("ApiError");
  });
});
