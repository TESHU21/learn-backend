import { describe, test, expect, jest } from "@jest/globals";
import { asyncHandler } from "../../src/utils/asyncHandler";

describe("asyncHandler", () => {
  test("should call the function successfully without calling next", async () => {
    const req = {};
    const res = {};
    const next = jest.fn();

    const handler = asyncHandler(async () => {
      return "success";
    });

    await handler(req, res, next);

    expect(next).not.toHaveBeenCalled();
  });

  test("should catch errors and call next(error)", async () => {
    const req = {};
    const res = {};
    const next = jest.fn();

    const handler = asyncHandler(async () => {
      throw new Error("Something went wrong");
    });

    await handler(req, res, next);

    // flush microtasks
    await Promise.resolve();

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
