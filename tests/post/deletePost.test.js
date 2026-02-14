import { Post } from "../../src/models/post.model.js";
import { User } from "../../src/models/user.model.js";
import request from "supertest";
import app from "../../src/app.js";

describe("Test Update of a post", () => {
  let token;
  let authorId;
  let postId;

  beforeEach(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});

    // Create user
    await User.create({
      username: "Teshome",
      email: "teshome.mosneh@gmail.com",
      password: "Password123!",
      role: "admin",
    });

    // Login user
    const loginRes = await request(app).post("/api/v1/users/login").send({
      email: "teshome.mosneh@gmail.com",
      password: "Password123!",
    });

    token = loginRes.body.accessToken;
    authorId = loginRes.body.user.id.toString();

    // Create post
    const postRes = await Post.create({
      name: "keneni Alemu",
      description: "our first post with keneni",
      age: 34,
      author: authorId,
    });

    postId = postRes._id.toString();
    console.log("Post ID:", postId);
  });

  it("should dlete all  post successfully", async () => {
    const res = await request(app)
      .delete(`/api/v1/posts/deletea`) // ✅ FIXED SLASH
      .set("Authorization", `Bearer ${token}`)

      .expect(200);

    // ✅ Assertions
  });
  it("should delete a specific post ", async () => {
    const res = await request(app)
      .delete(`/api/v1/posts/delete/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
