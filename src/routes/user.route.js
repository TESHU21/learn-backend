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
import {
  requestPasswordReset,
  verifyPasswordResetOtp,
  resetPassword,
} from "../controllers/forgotpassword.controller.js";
import {
  resetRequestLimiter,
  otpLimiter,
} from "../middlewares/rateLimit.middleware.js";
import {
  passwordResetRequest,
  resetPasswordSchema,
} from "../schemas/passwordRest.schema.js";
const router = Router();

// auth routes (specific routes first)
router.post("/register", registerUser);

router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);

// user routes (parameterized routes last)
// GET /api/v1/users  -> all users
router.route("/").get(authenticate, getAllUsers);
// GET /api/v1/users/:id -> single user
router.route("/:id").get(authenticate, getUserById);
// upload avatar

router
  .route("/avatar")
  .put(authenticate, avatarUploader.single("avatar"), uploadAvatar);
// change password
router.route("/change-password").put(authenticate, changePassword);
router
  .route("/update-profile")
  .put(authenticate, validateRequest(updateProfileSchema), updateProfile);
// password reset flow
router.route("/password-reset/request").post(
  authenticate,
  // validateRequest(passwordResetRequest),
  requestPasswordReset
);
router
  .route("/password-reset/verify")
  .post(authenticate, otpLimiter, verifyPasswordResetOtp);
router
  .route("/password-reset/confirm")
  .post(
    authenticate,
    validateRequest(resetPasswordSchema),
    otpLimiter,
    resetPassword
  );

export default router;
