import rateLimit from "express-rate-limit";

export const anonLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 2,
  skip: (req) => !!req.user,
  statusCode: 429,
  message: {
    success: false,
    error:
      "You've used 2 free shortens. Log in or sign up for unlimited access.",
  },
});
