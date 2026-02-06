import { generateOtp } from "../../src/utils/otp";
test("OTP should be 6 digits", () => {
  const otp = generateOtp();
  const regex = /^\d{6}$/;
  expect(regex.test(otp)).toBe(true);
});
