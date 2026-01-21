import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// GET all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -refreshTokens");
  if (!users) {
    throw new ApiError(400, "No Users found");
  }
  res.status(200).json({ data: users });
});

// GET single user by ID
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId format
  if (!id || !mongoose.isValidObjectId(id)) {
    throw new ApiError(
      400,
      "Invalid user ID format. ID must be a valid MongoDB ObjectId (24 character hex string)"
    );
  }

  const user = await User.findById(id).select("-password -refreshTokens");
  if (!user) {
    throw new ApiError(400, "User Not Found");
  }

  res.status(200).json({
    data: user,
    message: "User retrieved successfully",
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const allowedFields = ["firstName", "lastName", "phone", "bio", "address"];
  const updates = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true, runValidators: true }
  ).select("-password");
  if (!user) {
    throw new ApiError(400, "user is not found");
  }
  res.status(200).json({
    message: "profile updated successfully",
    data: user,
  });
});
i;
export { getAllUsers, getUserById, updateProfile };
