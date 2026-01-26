import mongoose from "mongoose";
import crypto from "crypto";
import { required } from "zod/mini";
const resetOtpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: { type: String, required: true },
    otpHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 },
    purpose: {
      type: String,
      enum: ["PASSWORD_RESET", "EMAIL_VERIFY"],
      required: true,
    },
    used: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
resetOtpSchema.methods.verifyOTP = function (otp) {
  const hash = crypto.createHash("sha256").update(otp).digest("hex");
  return this.otpHash === hash;
};
// TTL Index-auto delete expired OTP
resetOtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export default mongoose.model("Otp", resetOtpSchema);
