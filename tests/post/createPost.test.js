import { Post } from "../../src/models/post.model.js";
import app from "../../src/app.js";
import request from "supertest";
import { User } from "../../src/models/user.model.js";
describe("Create a Post (protected", () => {
  let token;
  let authorId;
  beforeEach(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});
    // create user
    await User.create({
      username: "TeshomeM",
      email: "teshome.mosneh@gmail.com",
      password: "Password123!",
      role: "user",
    });
    // Login Usersit
    const loginRes = await request(app).post("/api/v1/users/login").send({
      email: "teshome.mosneh@gmail.com",
      password: "Password123!",
    });
    console.log("Login Res", loginRes.body);
    token = loginRes.body.accessToken;
    authorId = loginRes.body.user.id.toString();
  });
  it("an autenticated users ca create post sucessfully", async () => {
    const res = await request(app)
      .post("/api/v1/posts/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Teshome Mosneh",
        description: "our first post with keneni",
        age: 34,
        author: authorId,
      })
      .expect(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("message", "Post created successfully");
  });
  it("should reject creating a post ", async () => {
    const res = await request(app).post("/api/v1/posts/create");
    expect(res.body).toHaveProperty("message");
  });
});
