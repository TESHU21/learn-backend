import jwt from "jsonwebtoken";
import { generateAcessToken } from "../utils/token.js";
import { User } from "../models/user.model.js";

export const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    
    // Fetch user to get role (refresh token only contains userId)
    const user = await User.findById(decoded.userId).select("_id role");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    
    const newAccessToken = generateAcessToken(user);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Refresh token error:", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Refresh token expired" });
    }
    return res.status(403).json({ message: "Invalid Refresh Token" });
  }
};
