import crypto from "crypto";
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 90000).toString();
};
const hashOtp = (otp) => {
  return crypto.createHash("sha256").update("otp").digest("hex");
};
const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
export { generateOtp, hashOtp, generateResetToken };
