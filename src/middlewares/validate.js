import { z } from "zod";
const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors[0].message });
    }
    // replace request body with sanitized and validated data
    req.body = result.data;
    next();
  };
};
export { validateRequest };
