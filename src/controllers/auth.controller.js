import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
// controllers/auth.controller.js
import bcrypt from "bcrypt";
import validator from "validator";
import { generateAcessToken, generateRefreshToken } from "../utils/token.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const refreshAccessToken = async (req, res) => {
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

// -------------------- REGISTER USER --------------------
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // 1️⃣ Basic validation
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // 2️⃣ Check if user already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3️⃣ Create user (password will be hashed by pre-save hook)
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password, // Let the pre-save hook hash it
      role: role.toLowerCase(),
      loggedIn: false,
      refreshTokens: [], // initialize empty
    });

    // 5️⃣ Respond
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- LOGIN USER --------------------
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // 1️⃣ Find user + password
  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+password"
  );
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  // 2️⃣ Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  // 3️⃣ Generate tokens
  const accessToken = generateAcessToken(user);
  const refreshToken = generateRefreshToken(user);

  // 4️⃣ Store hashed refresh token in DB
  const hashedToken = await bcrypt.hash(refreshToken, 10);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  // model level update
  await User.updateOne(
    { _id: user._id },
    {
      $push: { refreshTokens: { token: hashedToken, expiresAt } },
      $set: { loggedIn: true },
    }
  );

  // 5️⃣ Set refresh token cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // 6️⃣ Send response
  res.status(200).json({
    message: "Login successful",
    accessToken,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
  });
});

// -------------------- LOGOUT USER --------------------
const logoutUser = async (req, res) => {
  try {
    console.log("Refresh Token", req);
    const refreshToken = req.cookie.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ message: "No refresh token provided" });
    }

    // 1️⃣ Find user who owns this refresh token
    const allUsers = await User.find({});
    let user;
    for (const u of allUsers) {
      for (const t of u.refreshTokens) {
        if (await bcrypt.compare(refreshToken, t.token)) {
          user = u;
          break;
        }
      }
      if (user) break;
    }

    // 2️⃣ If no user found, clear cookie and exit
    if (!user) {
      res.clearCookie("refreshToken");
      return res.status(204).send();
    }

    // 3️⃣ Remove refresh token
    user.refreshTokens = user.refreshTokens.filter(
      (t) => !bcrypt.compare(refreshToken, t.token)
    );
    await user.save();

    // 4️⃣ Clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { registerUser, loginUser, logoutUser, refreshAccessToken };
