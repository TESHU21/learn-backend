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
      role: "user",
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

  it("should update a post successfully", async () => {
    const res = await request(app)
      .patch(`/api/v1/posts/update/${postId}`) // ✅ FIXED SLASH
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "keenu",
        description: "updated description",
        age: 34,
      })
      .expect(200);

    // ✅ Assertions
    expect(res.body.post.name).toBe("keenu");
    expect(res.body.post.description).toBe("updated description");
    expect(res.body.post.age).toBe(34);

    // ensure author stays the same
    expect(res.body.post.author.toString()).toBe(authorId);
  });
});
