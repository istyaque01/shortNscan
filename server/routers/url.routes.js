import express from "express";
import {
  createUrl,
  routeToUrl,
  getAllUrl,
} from "../controller/url.controller.js";
import { decodeToken } from "../middleware/auth.middleware.js";
import { anonLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

router.post("/", decodeToken, anonLimiter, createUrl);
router.get("/all", decodeToken,getAllUrl);
router.get("/:id",routeToUrl);

export default router;
