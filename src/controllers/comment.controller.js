import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../models/post.model.js";
import mongoose from "mongoose";

const addComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;

  // Validate input
  if (!postId || !text?.trim()) {
    throw new ApiError(400, "postId and text are required");
  }

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new ApiError(400, "Invalid post ID");
  }

  // Check post exists
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  console.log("request user", req.user);
  // Create comment
  const comment = await Comment.create({
    postId,
    userId: req.user._id,
    text: text.trim(),
  });

  // Increment count
  await Post.findByIdAndUpdate(
    postId,
    { $inc: { commentCount: 1 } } // make sure field name matches schema
  );

  res.status(201).json({
    success: true,
    message: "Comment added successfully",
    data: {
      id: comment.id,
      postId: comment.postId.toString(),
      userId: comment.userId.toString(),
      text: comment.text,
      createdAt: comment.createdAt,
    },
  });
});
const getAllCommentByPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const user = req.user;
  if (!user) {
    throw new ApiError(404, "USer not found");
  }

  if (!postId) {
    throw new ApiError(400, "Post Id is required");
  }

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new ApiError(400, "Invalid Post Id");
  }

  const comments = await Comment.find({ postId }).populate(
    "userId",
    "_id email role"
  );

  if (comments.length === 0) {
    throw new ApiError(404, "No comments found for this post");
  }

  res.status(200).json({
    success: true,
    message: "Comments retrieved successfully",
    data: comments,
  });
});

// Edit a comment
const editComment = asyncHandler(async (req, res, next) => {
  const { commentId } = req.params;
  const { text } = req.body;
  // validate a comment Id
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new ApiError(400, "Invalid Comment Id");
  }
  if (!text || !text.trim()) {
    throw new ApiError(400, "comment text is required");
  }
  const comment = await Comment.findById(commentId);
  if (!comment || comment.isDeleted) {
    return res.status(404).json({ message: "Not Found" });
  }
  if (!comment.userId.equals(req.user.id)) {
    return res.status(403).json({ message: "Forbidden to edit" });
  }
  comment.text = req.body.text;
  await comment.save();
  res.status(200).json({ message: "comment updated sucessfully", comment });
});
// delete a specific comment
const deleteSingleComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new ApiError(400, "Invalid Comment Id");
  }
  const comment = await Comment.findById(commentId);
  if (!comment || comment.isDeleted) {
    return res.status(404).json({ message: "Not Found" });
  }
  const isOwner = comment.userId.equals(req.user._id);
  const isAdmin = req.user?.role === "admin";
  // Block only if NOT admin AND NOT owner
  if (!isAdmin && !isOwner) {
    throw new ApiError(403, "You Are Not allowed to delete this comment");
  }
  comment.isDeleted = true;
  await comment.save();
  await Post.findByIdAndUpdate(comment.postId, { $inc: { commentsCount: -1 } });

  res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
  });
});
// Get a Single Comment By Id
const getSingleComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new ApiError(400, "Invalid Comment Id");
  }
  // Find Comment

  const comment = await Comment.findById(commentId).populate(
    "userId",
    "_id email role"
  );
  if (!comment) {
    return res.status(404).json({ message: "Not Found" });
  }

  res.status(200).json({
    success: true,
    data: comment,
    message: "Comment deleted successfully",
  });
});
export {
  addComment,
  getAllCommentByPost,
  editComment,
  getSingleComment,
  deleteSingleComment,
};
