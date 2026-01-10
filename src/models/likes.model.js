import mongoose, { Schema } from "mongoose";
import { required } from "zod/mini";
const reactionSchema = new Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["like", "love", "haha", "wow", "sad", "angry"],
      required: true,
    },
  },

  { timestamps: true }
);
// Unique reaction per user per post
reactionSchema.index({ postId: 1, userId: 1 }, { unique: true });
export const Reaction = mongoose.model("Reaction", reactionSchema);
