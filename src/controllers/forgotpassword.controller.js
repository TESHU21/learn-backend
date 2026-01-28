import bycrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { hashOtp, generateOtp, generateResetToken } from "../utils/otp.js";
import { sendOtpEmail } from "../config/mailersend.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Otp from "../models/otp.model.js";
// request password reset
const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  console.log("Email", email);

  if (!user) {
    return res
      .status(200)
      .json({ message: "If the email exists, OTP has been sent" });
  }
  const otp = generateOtp();
  console.log("Generating OTP", otp);
  await Otp.create({
    userId: user._id,
    email: email,
    purpose: "PASSWORD_RESET",
    otpHash: hashOtp(otp),
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  await sendOtpEmail(email, otp);
  res.status(200).json({
    message: "If the email exists,OTP has been sent",
  });
});
// OTP Verification
const verifyPasswordResetOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "Invalid OTP");
  }
  const record = await Otp.findOne({
    userId: user._id,
    purpose: "PASSWORD_RESET",
  });
  if (!record || record.expiresAt < Date.now()) {
    throw new ApiError(404, "Invalid or expired OTP");
  }
  if (record.attempts >= 5) {
    throw new ApiError(404, "Too many Attempts");
  }
  if (hashOtp(otp) !== record.otpHash) {
    record.attempts += 1;
    await record.save();
    throw new ApiError("Invalid OTP");
  }
  // OTP-verified  token generation
  const resetToken = generateResetToken();
  // OTP valid-delete it
  record.resetTokenHash = resetToken;
  record.resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000);
  record.otpHash = undefined;
  await record.save();
  res.status(200).json({
    message: "OTP verified",
    resetToken,
  });
});
// Password Reset
const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword, resetToken } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "unautorized");
  }
  const record = await Otp.findOne({
    userId: user._id,
    purpose: "PASSWORD_RESET",
    resetTokenHash: hashOtp(resetToken),
  });
  if (
    !record ||
    !record.resetTokenExpires ||
    record.resetTokenExpires < Date.now()
  ) {
    throw new ApiError(404, "Invalid or expired reset token");
  }
  user.password = await bycrypt.hash(newPassword, 10);
  await user.save();
  // Clean Up or delete
  await record.deleteOne();
  res.status(200).json({ message: "Password Reset Successfull" });
});
export { requestPasswordReset, verifyPasswordResetOtp, resetPassword };
