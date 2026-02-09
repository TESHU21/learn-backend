import { jest } from "@jest/globals";

// ✅ Mock logger BEFORE importing middleware
jest.unstable_mockModule("../../src/utils/logger.js", () => ({
  default: {
    error: jest.fn(),
  },
}));

// ✅ Import modules AFTER mocking
const logger = (await import("../../src/utils/logger.js")).default;
const { ApiError } = await import("../../src/utils/ApiError.js");
const { globalErrorHandler } = await import(
  "../../src/middlewares/error.middleware.js"
);

describe("globalErrorHandler Middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      originalUrl: "/test-route",
      method: "GET",
      ip: "127.0.0.1",
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = "test";
  });

  it("should handle ApiError correctly", () => {
    const err = new ApiError(404, "User not found");

    globalErrorHandler(err, req, res, next);

    expect(logger.error).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "User not found",
    });
  });

  it("should convert normal Error into ApiError", () => {
    const err = new Error("Something broke");

    globalErrorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Something broke",
    });
  });
});
