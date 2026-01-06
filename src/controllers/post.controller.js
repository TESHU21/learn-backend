import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPost = asyncHandler(async (req, res) => {
  const { name, description, age } = req.body;

  if (!name || !description || !age) {
    throw new ApiError(400, "All fields are required");
  }

  const post = await Post.create({
    name,
    description,
    age,
    author: req.user._id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
});
// Get All Posts
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  if (!posts) {
    throw new ApiError(400, "No Posts Found");
  }
  res.status(200).json(posts);
});

// get a single posst
const getSinglePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    throw new ApiError(40, "No Posts Found");
  }
  res.status(200).json({ message: "Post fetched successfully", post });
});

// update a post
const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw new ApiError(400, "This Post is not found for update");
  }
  const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
  if (!post) {
    throw new ApiError(400, "No Posts Found");
  }

  res.status(200).json({ message: "Post updated successfully", post });
});
// delete a specific post
const deletePost = async (req, res) => {
  const { id } = req.params;

  const postTodelete = await Post.findByIdAndDelete(id);
  if (!postTodelete) {
    throw new ApiError(400, " Post is not found to delete");
  }
  res.status(200).json({ message: "Post deleted successfully" });
};
// delete all posts
const deleteAllPosts = asyncHandler(async (req, res) => {
  // must be autenticated
  if (!req.user) {
    throw new ApiError(401, "User not Autenticated");
  }

  const result = await Post.deleteMany({
    author: req.user.id,
  });
  console.log("Response ", result);
  res.status(200).json({
    message: "All your posts have been deleted",
    deletedCount: result.deletedCount,
  });
});
// approve a specific post by Admin
const approvePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new ApiError(400, "Post not found");
  }
  post.status = "approved";
  post.approvedAt = new Date();
  post.approvedBy = req.user.id;
  await post.save();

  res.status(200).json({ message: "Post Approved Successfully" });
});
// Rejected a specific post by Admin
const rejectedPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new ApiError(400, "post not found");
  }
  post.status = "rejected";
  await post.save();
  res.status(200).json({ message: "Posted Rejected Successfully" });
});

export {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  deleteAllPosts,
  getSinglePost,
  approvePost,
  rejectedPost,
};
