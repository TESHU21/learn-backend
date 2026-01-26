import z from "zod";

const passwordResetRequest = z.object({
  email: z.email(),
});

const resetPasswordSchema = z.object({
  email: z.email(),
  otp: z.string().length(6),
  newPassword: z.string().min(8),
});

export { passwordResetRequest, resetPasswordSchema };
