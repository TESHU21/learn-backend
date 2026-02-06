import request from "supertest";
import app from "../../src/app.js";
import { User } from "../../src/models/user.model.js";
import mongoose from "mongoose";
describe("Get All Users api/v1/users (protected)", () => {
  let token;
  let userId;
  beforeEach(async () => {
    await User.deleteMany({});
    // create many users
    const registerUsers = await User.create([
      {
        username: "admin",
        email: "admin@test.com",
        password: "Password123!",
        role: "admin",
      },
      {
        username: "user",
        email: "user@test.com",
        password: "Password123!",
        role: "user",
      },
    ]);

    // Login a users
    const loginRes = await request(app).post("/api/v1/users/login").send({
      email: "admin@test.com",
      password: "Password123!",
    });
    token = loginRes.body.accessToken;
  });
  // sucess
  it("should return all users when authenticated", async () => {
    const res = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body).not.toHaveProperty("message");
  });
  //   UNAUTORIZED
  it("reject request without authentication token", async () => {
    const res = await request(app).get("/api/v1/users").expect(401);
    expect(res.body).toHaveProperty("message");
  });
});
