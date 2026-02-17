import { z } from "zod";
const signupSchema = z.object({
  name: z.string().min(3, "Name should contain at least 3 characters"),
  email: z.email("Invalid Email Address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  role: z.enum(["user", "admin", "moderator"]).optional().default("user"),
});
const loginSchema = z.object({
  email: z.email("Invalid Email Address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});
export { signupSchema, loginSchema };
