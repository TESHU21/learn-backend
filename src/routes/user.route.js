import { Router } from "express";

import {
  refreshAccessToken,
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";
import { getAllUsers, getUserById } from "../controllers/user.controller.js";
import cloudinaryUp
const router = Router();

// auth routes (specific routes first)
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);

// user routes (parameterized routes last)
// GET /api/v1/users  -> all users
router.route("/").get(getAllUsers);
// GET /api/v1/users/:id -> single user
router.route("/:id").get(getUserById);

export default router;
