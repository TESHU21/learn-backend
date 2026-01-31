import mongoose from "mongoose";

describe("Database readiness", () => {
  it("should be connected to test database", () => {
    // 1 = connected
    expect(mongoose.connection.readyState).toBe(1);
  });

  it("should be using TEST database", () => {
    expect(mongoose.connection.name).toBe("test");
  });
});
