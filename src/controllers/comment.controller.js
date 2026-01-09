import { Comment } from "../models/comment.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { Post } from "../models/post.model";
import mongoose from "mongoose";
import { success } from "zod";

export const addComment = asyncHandler(async (req, res) => {
  const { postId, text } = req.body;
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  //   use transaction(safe update)
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const [comment] = await Comment.create(
      [
        {
          postId,
          userId: req.user._id,
          text: text.trim(),
        },
      ],
      { session }
    );
    // Increament count automatically
    await Post.findByIdAndUpdate(
      postId,
      { $inc: { commentCount: 1 } },
      { session }
    );
    // commit transaction
    await session.commitTransaction();
    // return response with string id
    res.status(201).json({
      success: true,
      message: "Comment Added successfully",
      data: {
        id: comment.id,
        postId: comment.postId.toString(),
        userId: comment.userId.toString(),
        text: comment.text,
        createdAt: comment.createdAt,
      },
    });
  } catch (error) {
    // rolles back if anything fails
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});
