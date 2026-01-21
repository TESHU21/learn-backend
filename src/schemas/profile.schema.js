import z from "zod";
const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(3, "first name should at least three characters")
    .max(50)
    .optional(),
  lastName: z
    .string()
    .min(3, "first name should at least three characters")
    .max(50)
    .optional(),
  phone: z
    .string()
    .trim()
    .regex(
      /^(?:\+251|251|0)?(9|7)\d{8}$/,
      "Phone number must be a valid Ethiopian number (09 / 07)"
    )
    .optional(),

  address: z.string().max(300).optional(),
  bio: z.string().max(300).optional(),
});
export { updateProfileSchema };
