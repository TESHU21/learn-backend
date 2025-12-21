import { z } from "zod";
const createPostSchema = z.object({
  name: z.string().min(3, "Post name must be at least 3 characters"),
  description: z.string().min(5, "Description is too short"),
  age: z.number().min(0, "Age must be a positive number"),
});
const updatePostSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  age: z.number().optional(),
});
export { createPostSchema, updatePostSchema };
