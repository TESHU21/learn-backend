import mongoose from "mongoose";
import { User } from "../models/user.model.js";

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -refreshTokens");
    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Get All Users Error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// GET single user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ 
        message: "Invalid user ID format. ID must be a valid MongoDB ObjectId (24 character hex string)",
        providedId: id 
      });
    }

    const user = await User.findById(id).select("-password -refreshTokens");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      data: user,
      message: "User retrieved successfully",
    });
  } catch (error) {
    console.error("Get User By ID Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export { getAllUsers, getUserById };
