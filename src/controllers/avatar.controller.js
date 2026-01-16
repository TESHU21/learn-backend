import { User } from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
export const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Avatar Image is required");
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "user not found");
  }

  //   delete old avatar if exists
  if (user.avatar?.public_id) {
    await cloudinary.uploader.destroy(user.avatar.public_id);
  }
  // Save new avatar
  user.avatar = {
    url: req.file.path, // Cloudinary secure URL
    public_id: req.file.filename, // Cloudinary public_id
  };
  await user.save();
  res.status(200).json({ message: "Avatar updated sucessfully" });
});
