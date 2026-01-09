import { z } from "zod";
import mongoose from "mongoose";

export const commentSchema = z.object({
  postId: z
    .string()
    .min(1, "Post ID is required")
    .refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid post ID",
    }),
  text: z
    .string()
    .min(1, "Text is required")
    .transform((str) => str.trim()),
});
