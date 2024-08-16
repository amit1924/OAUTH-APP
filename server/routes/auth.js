import express from "express";
import {
  googleLogin,
  googleCallback,
  currentUser,
} from "../controllers/authController.js";
import verifyToken from "../middleware/auth.js  ";
const router = express.Router();

// @route GET /api/auth/google
router.get("/google", googleLogin);

// @route GET /api/auth/google/callback
router.get("/google/callback", googleCallback);

// @route GET /api/auth/current-user
router.get("/current-user", verifyToken, currentUser);

export default router;
