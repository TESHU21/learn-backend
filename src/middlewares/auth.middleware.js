import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const accessToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("_id email role");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; //  THIS IS CRITICAL
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
