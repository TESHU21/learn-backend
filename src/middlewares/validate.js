import { z } from "zod";
const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); //Throws error if it is invalid
    next();
  } catch (error) {
    // Send the first error message
    res.status(400).json({ message: error.errors[0].message });
  }
};
export { validateRequest };
