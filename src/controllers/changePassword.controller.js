import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await User.findById(req.user._id).select("+password");
  if (!user) {
    throw new ApiError(404, "User not Found");
  }
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new ApiError(401, "Current Password is incorrect");
  }
  const same = await user.comparePassword(newPassword);
  if (same) {
    throw new ApiError(400, "New Password Must be different");
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({ message: "Password Changed Successfully" });
});
