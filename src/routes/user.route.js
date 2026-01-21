import { Router } from "express";

import {
  refreshAccessToken,
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getAllUsers, getUserById } from "../controllers/user.controller.js";
import { uploadAvatar } from "../controllers/avatar.controller.js";
import avatarUploader from "../middlewares/avatarUpload.middleware.js";
import { changePassword } from "../controllers/changePassword.controller.js";
import { updateProfile } from "../controllers/user.controller.js";
import { updateProfileSchema } from "../schemas/profile.schema.js";
import { validateRequest } from "../middlewares/validate.js";
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
// upload avatar

router
  .route("/avatar")
  .put(authenticate, avatarUploader.single("avatar"), uploadAvatar);
// change password
router.route("/change-password").put(authenticate, changePassword);
router
  .route("update-profile")
  .put(authenticate, validateRequest(updateProfileSchema), updateProfile);

export default router;
