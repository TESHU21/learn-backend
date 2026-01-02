import { z } from "zod";
const validateRequest = (schema) => {
  return (res, req, next) => {
    const result = schema.safeparse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.error[0].message });
    }
    // replace request bosy with sanitized and validated data
    req.body = result.data;
    next();
  };
};
export { validateRequest };
