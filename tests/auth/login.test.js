import request from "supertest";
import app from "../../src/app.js";
import { User } from "../../src/models/user.model.js";

describe("Auth - Login User", () => {
  beforeEach(async () => {
    // Create user before login
    await User.create({
      username: "testuser",
      email: "testuser@example.com",
      password: "Password123!",
      role: "user",
    });
  });

  it("should login a user successfully", async () => {
    const userData = {
      email: "testuser@example.com",
      password: "Password123!",
    };

    const res = await request(app)
      .post("/api/v1/users/login")
      .send(userData)
      .expect(200);

    // ✅ Assertions
    expect(res.body).toHaveProperty("message", "Login successful");
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toBe(userData.email);
  });
});
