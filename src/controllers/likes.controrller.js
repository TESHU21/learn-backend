import { Reaction } from "../models/likes.model.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Post } from "../models/post.model.js";
import { success } from "zod";
// add or change the reaction
const reactPost = asyncHandler(async (req, res) => {
  const { type } = req.body;
  const { postId } = req.params;
  const userId = req.user._id;
  //   validate post Id
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new ApiError(400, "Invalid PostId");
  }
  if (!type) {
    throw new ApiError(400, "Reaction type is required");
  }
  const postExist = await Post.findById(postId);
  if (!postExist) {
    throw new ApiError(400, "Post not found");
  }

  const reaction = await Reaction.findOne({ postId, userId });
  if (reaction) {
    // update existing reaction
    reaction.type = type;
    reaction = await Reaction.save();
  } else {
    // create new raction
    reaction = await Reaction.create({ postId, userId, type });
  }

  res.status(200).json({
    success: true,
    message: "Reaction saved sucessfully",
    data: reaction,
  });
});
// remove reaction
const removeReaction = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new ApiError(400, "Invalid Post Id");
  }

  await Reaction.findOneAndDelete({
    postId,
    userId,
  });
  res.status(200).json({ message: "reaction removed sucessfully" });
});
const getReactionstats = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new ApiError(400, "Invalid Post Id");
  }
  const stats = await Reaction.aggregate([
    { $match: { postId: new mongoose.Types.ObjectId(postId) } },
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({ message: "Reaction Status retrieved sucessfully" });
});

export { reactPost, removeReaction, getReactionstats };
