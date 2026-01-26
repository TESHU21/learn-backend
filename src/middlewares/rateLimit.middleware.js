import rateLimit from "express-rate-limit";

export const resetRequestLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
});

export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
});
