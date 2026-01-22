import crypto from "crypto";
const generateOtp = () => {
  Math.floor(100000 + Math.random() * 90000).toString();
};
const hashOtp = (otp) => {
  crypto.createHash("sha256").update("otp").digest("hex");
};
export { generateOtp, hashOtp };
