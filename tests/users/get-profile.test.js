import request from "supertest";
import app from "../../src/app.js";
import { User } from "../../src/models/user.model.js";
describe("GET /api/v1/users(protected)", () => {
  let token;
  beforeEach(async () => {
    await User.deleteMany({});
    //create user
    await User.create({
      username: "admin",
      email: "admin@test.com",
      password: "Password123!",
      role: "admin",
    });
    // Login User
    const loginRes = await request(app).post("/api/v1/users/login").send({
      email: "admin@test.com",
      password: "Password123!",
    });

    token = loginRes.body.accessToken;
  });
  it("should return all users when authenticated", async () => {
    const res = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
    // No sensitive fields
    if (res.body.data.length > 0) {
      expect(res.body.data[0]).not.toHaveProperty("password");
      expect(res.body.data[0]).not.toHaveProperty("refreshTokens");
    }
  });

  it("should reject request without token", async () => {
    const res = await request(app).get("/api/v1/users").expect(401);

    expect(res.body).toHaveProperty("message");
  });
  //   it should return a single users by id
});
