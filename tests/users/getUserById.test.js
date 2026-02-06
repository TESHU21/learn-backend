import request from "supertest";
import app from "../../src/app.js";
import { User } from "../../src/models/user.model.js";
import mongoose from "mongoose";
describe("GET /api/v1.users:id (protected)", () => {
  let token;
  let userId;
  beforeEach(async () => {
    await User.deleteMany({});
    // create user
    const registerRes = await User.create({
      username: "admin",
      email: "admin@test.com",
      password: "Password123!",
      role: "admin",
    });
    userId = registerRes._id.toString();
    // Login User
    const loginRes = await request(app).post("/api/v1/users/login").send({
      email: "admin@test.com",
      password: "Password123!",
    });
    token = loginRes.body.accessToken;
  });
  //   success
  it("should return all users when authenticated", async () => {
    const res = await request(app)
      .get(`/api/v1/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("message", "User retrieved successfully");
    // sensetive fields no shouldn't exist
    expect(res.body).not.toHaveProperty("password");
    expect(res.body).not.toHaveProperty("refreshTokens");
  });
  it("should return 400 for invalid user ID format", async () => {
    const res = await request(app)
      .get(`/api/v1/users/123-invalid-id`)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toMatch(/Invalid user ID format/i);
  });
  it("should return 400 if users is not found", async () => {
    const nonExistingId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .get(`/api/v1/users/${nonExistingId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);

    expect(res.body).toHaveProperty("message", "User Not Found");
  });

  // UNAUTHORIZED
  it("should reject request without authentication token", async () => {
    const res = await request(app).get(`/api/v1/users/${userId}`).expect(401);

    expect(res.body).toHaveProperty("message");
  });
});
