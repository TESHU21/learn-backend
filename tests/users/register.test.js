import request from "supertest";
import app from "../../src/app.js";
import { User } from "../../src/models/user.model.js";

describe("Auth - Register User", () => {
  it("should register a new user successfully", async () => {
    const userData = {
      username: "testuser",
      email: "testuser@example.com",
      password: "Password123!",
      role: "user",
    };

    const res = await request(app)
      .post("/api/v1/users/register")
      .send(userData)
      .expect(201);

    // ✅ Response assertions
    expect(res.body).toHaveProperty("message", "User registered successfully");
    expect(res.body).toHaveProperty("user");

    expect(res.body.user).toHaveProperty("id");
    expect(res.body.user.email).toBe(userData.email.toLowerCase());
    expect(res.body.user.username).toBe(userData.username);
    expect(res.body.user.role).toBe(userData.role);

    // ✅ DB assertion
    const userInDb = await User.findOne({ email: userData.email });
    expect(userInDb).not.toBeNull();
    expect(userInDb.username).toBe(userData.username);
    expect(userInDb.password).not.toBe(userData.password); // hashed
  });
});
