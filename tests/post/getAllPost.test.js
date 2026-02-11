import app from "../../src/app.js";
import { Post } from "../../src/models/post.model.js";
import { User } from "../../src/models/user.model.js";
import request from "supertest";
describe("GET ALL POST BY Authenticated User", () => {
  let token;
  let authorId;
  beforeEach(async () => {
    await User.deleteMany({});
    // create a user
    await User.create({
      username: "Teshome",
      email: "teshome.mosneh@gmail.com",
      password: "Password123!",
      role: "user",
    });
    const loginRes = await request(app).post("/api/v1/users/login").send({
      email: "teshome.mosneh@gmail.com",
      password: "Password123!",
    });
    token = loginRes.body.accessToken;
    authorId = loginRes.body.user.id.toString();
    // create ssample posts
    await Post.create([
      {
        name: "keneni Alemu",
        description: "our first post with keneni",
        age: 34,
        author: authorId,
      },
      {
        name: "Teshome Mosneh",
        description: "our second post with keneni",
        age: 34,
        author: authorId,
      },
    ]);
  });
  it("should fetch all posts successfully", async () => {
    const res = await request(app)
      .get("/api/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(res.body).toHaveProperty("data");
    //   should return array
    expect(Array.isArray(res.body.data)).toBe(true);

    // ✅ Check first post fields
    expect(res.body.data[0]).toHaveProperty("name");
    expect(res.body.data[0]).toHaveProperty("description");
    expect(res.body.data[0]).toHaveProperty("author");
  });
});
