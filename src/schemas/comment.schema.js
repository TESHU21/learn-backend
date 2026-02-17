import { z } from "zod";
import mongoose from "mongoose";

export const commentSchema = z.object({
  text: z
    .string()
    .min(1, "Text is required")
    .transform((str) => str.trim()),
});
